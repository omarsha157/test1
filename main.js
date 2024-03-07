const loadingScreen = document.querySelector('.loading')
const currYear = document.querySelector('.curr-year')

const customerInfoOut = document.querySelector('.ci-wrapper')
const checklistOut = document.querySelector('.checklist-out')
const advisorNotes = document.querySelector('.notes-out')
const imageOut = document.querySelector('.image-grid')

const advisorNotesSection = document.querySelector('.advisor-notes')
const inspectionImgSection = document.querySelector('.inspection-images-wrapper')

const errorScreen = document.querySelector('.error')

const date = new Date()
const year = date.getFullYear()

currYear.innerText = year

window.onload = () => {
    starter()
}

async function starter() {
    errorScreen.classList.add('hide')

    const encodedUrl = new URL(window.location.href);
    let param = encodedUrl.searchParams.get('id');

    let decodedParam = decodeURL(param)

    // ? decrypting logic
    let key = "s&a8Q!q#24f@L7oR";
    let decryptedTid = await CryptoJS.AES.decrypt(decodedParam, key).toString(CryptoJS.enc.Utf8)

    getData(decryptedTid)
}

function decodeURL(url) {
    let decodedString = decodeURIComponent(url);

    return decodedString;
}

function getData(transId) {
    
    // if (!transId) {
    //     loadingScreen.style.display = "none"
    //     errorScreen.classList.remove('hide')
    //     return
    // }

    try {

        fetch('token.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then(data => {

                if (data.length == 0 && Array.isArray(data)) {
                    console.log('token empty array');
                    createNewAccessToken()
                    return
                }

                // let accessToken = data[0].crm_accesstoken

                fetch(`general.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json()
                    })
                    .then(data => {

                        populateCustomerInfo(data)
                        populateChecklist(data)
                        populateAdvisorNotes(data)

                        fetch(`images.json`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'access_token': ""
                            }
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error(`HTTP error! Status: ${res.status}`);
                                }
                                return res.json()
                            })
                            .then(data => {

                                if (data.Message == "Get Technician Inspection List unsuccessfully") {
                                    console.log('image API', data.Message);
                                    if (data.Data[0].errors[0].message == "Token Expired") {
                                        console.log('image API', data.Data[0].errors[0].message)
                                        createNewAccessToken()
                                    } else if (data.Data[0].message == "No records found") {
                                        console.log('image API', data.Data[0].message)
                                        inspectionImgSection.style.display = "none"
                                        loadingScreen.style.display = "none"
                                    }

                                } else {
                                    populateImages(data.Response)

                                    loadingScreen.style.display = "none"
                                }

                            })
                            .catch(error => {
                                console.log('image API fetch catch', error)
                                errorScreen.classList.remove('hide')
                            })

                    })
                    .catch(error => {
                        console.log('general API', error)
                        errorScreen.classList.remove('hide')
                    })
            })
            .catch(error => {
                console.log('get access token fetch err', error);
                errorScreen.classList.remove('hide')
            })


    } catch (error) {
        console.log('get data try catch', error);
        errorScreen.classList.remove('hide')
    }
}



function populateCustomerInfo(data) {
    let dataObj = data.Data.records[0]

    let infoHtml = `
    <div class="customer-info">
        <p>Dear Mr/Mrs <span class="bld">${dataObj.customer__name}</span>, German Experts has created this personalized
        and extensive Inspection report for your <span class="bld">${dataObj.vehicleMake__name}</span> vehicle with plate no: <span class="bld">${dataObj.plate_no}</span> and
        chassis no: <span class="bld">${dataObj.chassis_no}.</span></p>

        <p>Your vehicle was taken under the job request number <span class="bld">${dataObj.sName}</span> on <span class="bld">${dataObj.createdDate.split(" ")[0]}</span> by service advisor <span class="bld">${dataObj.service_advisor}</span>, phone: <a href="tel:971${dataObj.serviceAdvisorPhone}">+971${dataObj.serviceAdvisorPhone}</a> , <a href="https://api.whatsapp.com/send?phone=971${dataObj.serviceAdvisorPhone}">whatsapp</a>.
        </p>
    </div>
    `

    customerInfoOut.innerHTML = infoHtml


}


function checklistIcons(iconValue, brake = false) {

    if (iconValue == 'OK') {
        return '<td><img src="./assets/correct.png" alt=""></td>'
    } else if (iconValue == 'NOK') {
        return '<td><img src="./assets/failed.png" alt=""></td>'
    } else if (iconValue == 'CHK') {
        return '<td><img src="./assets/warning.png" alt=""></td>'
    } else if (iconValue == 'NA') {
        return '<td><img src="./assets/na-1.png" alt=""></td>'
    } else {
        if (brake) {
            let brakeThickness = extractNumberFromString(iconValue)

            if (Number(brakeThickness) <= 9) {
                return `<td><p style="color:red;">${iconValue}</p></td>`
            } else {
                return `<td><p">${iconValue}</p></td>`
            }

        } else {
            return `<td><p>${iconValue}</p></td>`
        }

    }
}

function extractNumberFromString(str) {
    // Find the position of "mm" in the string
    var index = str.indexOf("mm");
    if (index !== -1) {
        // Extract the substring containing numbers
        var numberString = str.substring(0, index);
        // Convert the substring to a number
        var number = parseFloat(numberString);
        // Return the extracted number
        return number;
    } else {
        // If "mm" is not found, return null or handle the case as per your requirement
        return null;
    }
}


function populateChecklist(data) {
    let dataObj = data.Data
    let records = dataObj.records[0]
    let engineCompartment = dataObj.enginecompartment_[0]
    let transmission = dataObj.transmissions_[0]
    let driveTrain = dataObj.driveTrain_[0]
    let brakeSystem = dataObj.brakeSystem_[0]
    let steering = dataObj.steering_[0]
    let interior = dataObj.interior_[0]
    let obdDiagnostic = dataObj.obdDiagnosticCodes_[0]
    let exterior = dataObj.exterior_[0]
    let electricalControls = dataObj.electricalControls_[0]
    let wheelsAndTyres = dataObj.wheelsAndTyres_[0]
    let underbody = dataObj.underBody_[0]
    let frontSuspension = dataObj.frontSuspension_[0]
    let rearSuspension = dataObj.rearSuspension_[0]
    let fuelSystem = dataObj.fuelSystem_[0]
    let exhaustSystem = dataObj.exhaustSystem_[0]

    let htmlData = `<button class="accordion clicked active"><img class="accordion-icon" src="./assets/checklist-icons/service checklist.png">SERVICE CHECKLIST<span class="arrow">▼</span></button>
    <div class="panel" style="display: block;">
        <div class="card-wrapper">
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="./assets/service.jpg" alt="">
                </div>
                
                <div class="card-data">

                    <table class="responsive-table">
                        <tr>
                            <td class="checklist-label">Engine Oil Level</td>
                            ${checklistIcons(engineCompartment.engine_oil)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Transmission Oil Condition</td>
                            ${checklistIcons(transmission.transmission_oil_condition)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Differential Oil Front Condition</td>
                            ${checklistIcons(driveTrain.differentiaL_OIL_CONDITION)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Brake Fluid Level, Reservoir And Cap Check</td>
                            ${checklistIcons(brakeSystem.brakE_FLUID_LEVEL_RESERVOIR_N_CAP_CHECK)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Power Steering Fluid Level And Reservoir Cap</td>
                            ${checklistIcons(steering.poweR_STEERING_FLUID_LEVEL_RESERVOIR_CAP)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Transfer Case Oil Condition</td>
                            ${checklistIcons(driveTrain.transfeR_CASE_OIL_CONDITION)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Filters And Spark Plugs</td>
                            ${checklistIcons(engineCompartment.filter_spark_plug)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Battery Voltage</td>
                            ${checklistIcons(records.batteryAmp)}
                        </tr>
                        <tr>
                            <td class="checklist-label">Battery Production Date</td>
                            ${checklistIcons(records.batteryProduction)}
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/interior driver.png">INTERIOR-DRIVER POSITION<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/interiror driver.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">Warning Lights ON(ESC,Airbag,MIL)</td>
                                        ${checklistIcons(interior.warninG_LIGHTS_ON_ESC_AIRBAG_MIL)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Stored Messages On-Board Computer</td>
                                        ${checklistIcons(obdDiagnostic.storeD_MESSAGES_ON_BOARD_COMPUTER)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">WindScreen Wiper Blade and Washers Control System</td>
                                        ${checklistIcons(interior.winD_SCREEN_WIPER_BLADE_WASHER_CONTROL_SYSTEM)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Electric Parking Brake Functionality</td>
                                        ${checklistIcons(brakeSystem.parkinG_BRAKE_FUNCTIONALITY)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Horn Functionality (All Areas Of Pad)</td>
                                        ${checklistIcons(records.hornFunctionalityAllAreasOfPadName)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/exterior 1.png">EXTERIOR<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/exterior.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">All Lights Condition</td>
                                        ${checklistIcons(exterior.alL_LIGHTS_PHYSICAL_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Lights Function</td>
                                        ${checklistIcons(electricalControls.alL_LIGHTS_FUNCTION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Windscreen Glass</td>
                                        ${checklistIcons(exterior.windscreeN_GLASS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Side Mirror Housing And Glass</td>
                                        ${checklistIcons(exterior.alL_SIDE_MIRROR_HOUSING_AND_GLASS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Fuel Lid Correctly Locking And Unlocking</td>
                                        ${checklistIcons(exterior.fueL_LID_CORRECTLY_LOCKING_AND_UNLOCKING)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Sunroof Glass And Seals</td>
                                        ${checklistIcons(records.sunroofGlassAndSealsTestForLeaksName)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Convertible Soft Top Condition</td>
                                        ${checklistIcons(exterior.convertiblE_SOFT_TOP_CONDITION)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/wheel 1.png">WHEELS AND TYRES<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/wheel3.png" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">Tyre Front Left Thread Depth/Evenness</td>
                                        ${checklistIcons(wheelsAndTyres.tyrE_FRONT_LEFT_THREAD_DEPTH_EVENNESS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Front Right Thread Depth/Evenness</td>
                                        ${checklistIcons(wheelsAndTyres.tyrE_FRONT_RIGHT_THREAD_DEPTH_EVENNESS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Rear Left Thread Depth/Evenness</td>
                                        ${checklistIcons(wheelsAndTyres.tyrE_REAR_LEFT_THREAD_DEPTH_EVENNESS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Rear Right Thread Depth/Evenness</td>
                                        ${checklistIcons(wheelsAndTyres.tyrE_REAR_RIGHT_THREAD_DEPTH_EVENNESS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Front Left Pressure Measure Gauge</td>
                                        ${checklistIcons(records.tyreFrontLeftPressureMeasureGauge)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Rear Left Pressure Measure Gauge</td>
                                        ${checklistIcons(records.tyreRearLeftPressureMeasureGuage)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Front Right Pressure Measure Gauge</td>
                                        ${checklistIcons(records.tyreFrontRightPressureMeasureGauge)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Tyre Rear Right Pressure Measure Gauge</td>
                                        ${checklistIcons(records.tyreRearRightPressureMeasureGauge)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Rim Condition</td>
                                        ${checklistIcons(wheelsAndTyres.alL_RIM_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Rim Wheel Bearing Condition(Play/Noise)</td>
                                        ${checklistIcons(wheelsAndTyres.alL_WHEEL_BEARINGS_CONDITION)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/brakes 1.png">BRAKES<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/brakes.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">Front Brake Pad Thickness</td>
                                        ${checklistIcons(records.flBrakePadpercent, true)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Brake Pad Thickness</td>
                                        ${checklistIcons(records.rlBrakePadThicknessPerce, true)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Front Brake Disc Actual Thickness</td>
                                        ${checklistIcons(records.flBrakeDiscActualThickness)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Front Brake Disc Recommended Thickness</td>
                                        ${checklistIcons(records.flBrakeDiscRecommendedThickness)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Brake Disc Actual Thickness</td>
                                        ${checklistIcons(records.frBrakeDiscActualThickness)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Brake Disc Recommended Thickness</td>
                                        ${checklistIcons(records.rlBrakeDiscRecommendedThickness)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/engine 1.png">ENGINE COMPARTMENT<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/engine compartment.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">Check Bonnet Lock, Switch, Cable</td>
                                        ${checklistIcons(engineCompartment.chkBontLock_switch_cable)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Check Power Steering Pump/Hoses For Leakages</td>
                                        ${checklistIcons(engineCompartment.chk_power_steering_pumb_hoses_for_leakage)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Windscreen Washer Fluid Level And Reservoir Cap</td>
                                        ${checklistIcons(engineCompartment.windscreen_washer_fluid_lvl_n_reser_cap)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Hoses (Cracks Damages Leaks)</td>
                                        ${checklistIcons(engineCompartment.all_hoses)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Accessory Belts(Condition Tension)</td>
                                        ${checklistIcons(engineCompartment.accesory_belt)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Check Coolant Level and Condition</td>
                                        ${checklistIcons(records.checkCoolantPressureTestName)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Engine Mount Check</td>
                                        ${checklistIcons(engineCompartment.engine_mount_check)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Transmission Mount Check</td>
                                        ${checklistIcons(transmission.transmission_mount_check)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Differential Oil Rear Condition</td>
                                        ${checklistIcons(driveTrain.differentiaL_OIL_REAR_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Check Differential Front/Rear Mounts</td>
                                        ${checklistIcons(driveTrain.checK_DIFFERENTIAL_FRONT_REAR_MOUNTS)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion"><img class="accordion-icon" src="./assets/checklist-icons/interior 1.png">INTERIOR<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/interior.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">All Seat Adjustment and Functionality</td>
                                        ${checklistIcons(electricalControls.alL_SEAT_ADJUSTMENT_FUNCTIONALITY)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Seat Belt Condition and Functionality</td>
                                        ${checklistIcons(interior.alL_SEAT_BELT_CONDITION_FUNCTIONALITY)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">All Door Handle Open Close Functionality (With door lock ON/OFF)</td>
                                        ${checklistIcons(exterior.alL_DOOR_HANDLE_OPEN_CLOSE_FUNCTIONALITY)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Emergency equipment kit</td>
                                        ${checklistIcons(exterior.emergencY_EQUIPMENT_REFLECTIVE_JACKE_WARNING_TRIANGLE_FIRST_AID_KIT)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Spare Wheel/Tyre Fit Kit</td>
                                        ${checklistIcons(wheelsAndTyres.sparE_WHEEL_PRESENCE_CONDITION)}
                                    </tr>
                                    
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>

                <button class="accordion last-acc"><img class="accordion-icon" src="./assets/checklist-icons/underbody 1.png">UNDER BODY<span class="arrow">►</span></button>
                <div class="panel">
                    <div class="card-wrapper">
                        <div class="card">
                            <div class="card-img-wrapper">
                                <img src="./assets/underbody 2.jpg" alt="">
                            </div>
                            
                            <div class="card-data">
    
                                <table class="responsive-table">
                                    <tr>
                                        <td class="checklist-label">Signs Of Oil Leaks</td>
                                        ${checklistIcons(underbody.signS_OF_OIL_LEAKS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Signs Of Coolant Leaks</td>
                                        ${checklistIcons(underbody.signS_OF_COOLANT_LEAKS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Front Sub Frame Condition</td>
                                        ${checklistIcons(frontSuspension.fronT_SUB_FRAME_FIXING_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Engine Mounts(Bottom Area)</td>
                                        ${checklistIcons(records.engineMountcheckName)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Front Suspension: Struts, Shocks and Spring</td>
                                        ${checklistIcons(frontSuspension.fronT_SUSPENSION_STRUTS_SOCKS_N_SPRING)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Front Suspension :Sway Bars/Links/Bushings</td>
                                        ${checklistIcons(frontSuspension.fronT_SUSPENSION_SWAY_BARS_LINKS_BUSHINGS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Steering Arms,Rack and Boots Condition</td>
                                        ${checklistIcons(steering.steerinG_ARMS_RACK_AND_BOOTS_INTEGRITY_AND_LEAK_CHECK)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Sub Frame Condition</td>
                                        ${checklistIcons(rearSuspension.reaR_SUB_FRAME_FIXING_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Suspension: Structs, Shocks and Springs</td>
                                        ${checklistIcons(rearSuspension.reaR_SUSPENSION_STRUCTS_SHOCKS_AND_SPRINGS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Rear Suspension :Sway Bars/Links/Bushings</td>
                                        ${checklistIcons(rearSuspension.reaR_SUSPENSION_SWAY_BARS_LINKS_BUSHINGS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">CV Joints/Boots</td>
                                        ${checklistIcons(driveTrain.cV_JOINTS_BOOTS)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Bottom Of Front And Rear Bumpers (Visual Damage)</td>
                                        ${checklistIcons(underbody.bottoM_OF_FRONT_AND_REAR_BUMPERS_VISUAL_DAMAGE)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">UnderBody Covers And Heat Shields Condition</td>
                                        ${checklistIcons(underbody.underbodY_COVERS_AND_HEAT_SHIELDS_FIXING_CONDITION)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Fuel Tank And Fuel Lines Condition</td>
                                        ${checklistIcons(fuelSystem.fuel_Tank_Fuel_Lines_Condition)}
                                    </tr>
                                    <tr>
                                        <td class="checklist-label">Exhaust System Condition</td>
                                        ${checklistIcons(exhaustSystem.exhausT_SYSTEM_CONDITION)}
                                    </tr>
                                </table>
    
                            </div>
                        </div>
                    </div>
                </div>
    
    `

    checklistOut.innerHTML = htmlData

    accordionLogic()
    openAllAccordionInMobile()
}

function populateAdvisorNotes(data) {

    let finalArr = data.Data.records
    let advisorNotesArr = []

    finalArr.forEach(item => {
        if (item.serviceAdvisorNote != '') {
            advisorNotesArr.push(item.serviceAdvisorNote)
        }
    })

    if (advisorNotesArr.length == 0 && Array.isArray(advisorNotesArr)) {
        advisorNotesSection.style.display = 'none'
    } else {
        let notesHtml = ``

        advisorNotesArr.forEach(note => {
            notesHtml += `
            <tr>
                <td><img src="./assets/Asset 1.png"></td>
                <td>${note}</td>
            </tr>
        `
        })

        advisorNotes.innerHTML = notesHtml
    }

}



function populateImages(arr) {
    let imagesArr = arr
    let imgHtml = ``
    imagesArr.forEach(img => {
        imgHtml += `
            <div class="grid-item">
                <img src="data:image/jpeg;base64,${img.data}" alt="${img.Name}" >
                <div class="grid-text">${img.Name}</div>
            </div>
        `
    })

    imageOut.innerHTML = imgHtml

    const gallery = new Viewer(document.getElementById('images'), {
        toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            prev: 1,
            reset: 1,
            next: 1,
            rotateLeft: 1,
            rotateRight: 1,
        },
        title: [1, image => `${image.alt}`]
    });
}


function accordionLogic() {

    let acc = document.getElementsByClassName("accordion");
    let panels = document.getElementsByClassName("panel");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("mouseover", function () {
            if (!this.classList.contains('clicked')) {
                this.classList.add("active");
                let panel = this.nextElementSibling;
                panel.style.display = "block";
                this.querySelector('.arrow').textContent = '▼';
            }
        });

        acc[i].addEventListener("mouseout", function () {
            if (!this.classList.contains('clicked')) {
                this.classList.remove("active");
                let panel = this.nextElementSibling;
                panel.style.display = "none";
                this.querySelector('.arrow').textContent = '►';
            }
        });

        acc[i].addEventListener("click", function () {
            this.classList.toggle("clicked");
            let panel = this.nextElementSibling;
            if (this.classList.contains('clicked')) {
                panel.style.display = "block";
                this.querySelector('.arrow').textContent = '▼';
            } else {
                panel.style.display = "none";
                this.querySelector('.arrow').textContent = '►';
            }
        });
    }

    for (i = 0; i < panels.length; i++) {
        panels[i].addEventListener("mouseover", function () {
            let button = this.previousElementSibling;
            if (!button.classList.contains('clicked')) {
                button.classList.add("active");
                this.style.display = "block";
                button.querySelector('.arrow').textContent = '▼';
            }
        });

        panels[i].addEventListener("mouseout", function () {
            let button = this.previousElementSibling;
            if (!button.classList.contains('clicked')) {
                button.classList.remove("active");
                this.style.display = "none";
                button.querySelector('.arrow').textContent = '►';
            }
        });

        panels[i].addEventListener("click", function () {
            let button = this.previousElementSibling;
            button.classList.toggle("clicked");
            if (button.classList.contains('clicked')) {
                this.style.display = "block";
                button.querySelector('.arrow').textContent = '▼';
            } else {
                this.style.display = "none";
                button.querySelector('.arrow').textContent = '►';
            }
        });
    }
}

// ? open all accordion on mobile

// window.addEventListener('resize', function () {
//     openAllAccordionInMobile()
// });

function openAllAccordionInMobile() {
    if (window.innerWidth <= 760) {
        let panels = document.querySelectorAll(".panel");
        let accordions = document.querySelectorAll(".accordion")
        let arrows = document.querySelectorAll(".arrow")

        panels.forEach(panel => panel.style.display = "block")

        accordions.forEach(accordion => {
            accordion.classList.add('clicked')
            accordion.classList.add('active')
        })

        arrows.forEach(arrow => arrow.innerText = "▼")

    }
}
const loadingScreen = document.querySelector('.loading')
const errorScreen = document.querySelector('.error')

const mainVideo = document.querySelector('video')
const carBrandLogo = document.querySelector('.car-brand-img')
const carBrand = document.querySelector('.car-brand')
const carModel = document.querySelector('.car-model')
const carYear = document.querySelector('.car-year')

const inspectionImgSection = document.querySelector('.image-section')

// ? overall rating

const overallRatingText = document.querySelector('.overall-rating-number')

// ? overview
// ? engine compartment
const engineCompartmentPercentageAccordion = document.querySelector('.engine-compartment-percentage-accordion')
const engineCompartmentPercentageText = document.querySelector('.engine-compartment-percentage-text')
const engineCompartmentPercentage = document.querySelector('.engine-compartment-percentage')
// ? transmission
const transmissionPercentageAccordion = document.querySelector('.transmission-percentage-accordion')
const transmissionPercentageText = document.querySelector('.transmission-percentage-text')
const transmissionPercentage = document.querySelector('.transmission-percentage')
// ? electrical controls
const electricalControlsPercentageAccordion = document.querySelector('.electrical-controls-percentage-accordion')
const electricalControlsPercentageText = document.querySelector('.electrical-controls-percentage-text')
const electricalControlsPercentage = document.querySelector('.electrical-controls-percentage')

// ? brake system
const brakeSystemPercentageAccordion = document.querySelector('.brake-system-percentage-accordion')
const brakeSystemPercentageText = document.querySelector('.brake-system-percentage-text')
const brakeSystemPercentage = document.querySelector('.brake-system-percentage')

// ? front suspension
const frontSuspensionPercentageAccordion = document.querySelector('.front-suspension-percentage-accordion')
const frontSuspensionPercentageText = document.querySelector('.front-suspension-percentage-text')
const frontSuspensionPercentage = document.querySelector('.front-suspension-percentage')

// ? rear suspension
const rearSuspensionPercentageAccordion = document.querySelector('.rear-suspension-percentage-accordion')
const rearSuspensionPercentageText = document.querySelector('.rear-suspension-percentage-text')
const rearSuspensionPercentage = document.querySelector('.rear-suspension-percentage')

// ? steering
const steeringPercentageAccordion = document.querySelector('.steering-percentage-accordion')
const steeringPercentageText = document.querySelector('.steering-percentage-text')
const steeringPercentage = document.querySelector('.steering-percentage')

// ? interior
const interiorPercentageAccordion = document.querySelector('.interior-percentage-accordion')
const interiorPercentageText = document.querySelector('.interior-percentage-text')
const interiorPercentage = document.querySelector('.interior-percentage')

// ? underbody
const underBodyPercentageAccordion = document.querySelector('.under-body-percentage-accordion')
const underBodyPercentageText = document.querySelector('.under-body-percentage-text')
const underBodyPercentage = document.querySelector('.under-body-percentage')

// ? fuel system
const fuelSystemPercentageAccordion = document.querySelector('.fuel-system-percentage-accordion')
const fuelSystemPercentageText = document.querySelector('.fuel-system-percentage-text')
const fuelSystemPercentage = document.querySelector('.fuel-system-percentage')

// ? exterior
const exteriorPercentageAccordion = document.querySelector('.exterior-percentage-accordion')
const exteriorPercentageText = document.querySelector('.exterior-percentage-text')
const exteriorPercentage = document.querySelector('.exterior-percentage')

// ? wheels and tyres
const wheelsAndTyresPercentageAccordion = document.querySelector('.wheels-and-tyres-percentage-accordion')
const wheelsAndTyresPercentageText = document.querySelector('.wheels-and-tyres-percentage-text')
const wheelsAndTyresPercentage = document.querySelector('.wheels-and-tyres-percentage')

// ? exhaust system
const exhaustSystemPercentageAccordion = document.querySelector('.exhaust-system-percentage-accordion')
const exhaustSystemPercentageText = document.querySelector('.exhaust-system-percentage-text')
const exhaustSystemPercentage = document.querySelector('.exhaust-system-percentage')

// ? drive train
const driveTrainPercentageAccordion = document.querySelector('.drive-train-percentage-accordion')
const driveTrainPercentageText = document.querySelector('.drive-train-percentage-text')
const driveTrainPercentage = document.querySelector('.drive-train-percentage')

// ? suspension
const suspensionPercentageAccordion = document.querySelector('.suspension-percentage-accordion')
const suspensionPercentageText = document.querySelector('.suspension-percentage-text')
const suspensionPercentage = document.querySelector('.suspension-percentage')

// ? obd diagnostics codes
const obdPercentageAccodion = document.querySelector('.obd-percentage-accordion')
const obdPercentageText = document.querySelector('.obd-percentage-text')
const obdPercentage = document.querySelector('.obd-percentage')

// ? ac system
const acSystemPercentageAccordion = document.querySelector('.ac-system-percentage-accordion')
const acSystemPercentageText = document.querySelector('.ac-system-percentage-text')
const acSystemPercentage = document.querySelector('.ac-system-percentage')

// ? road test and final checks
const roadTestPercentageAccordion = document.querySelector('.road-test-percentage-accordion')
const roadTestPercentageText = document.querySelector('.road-test-percentage-text')
const roadTestPercentage = document.querySelector('.road-test-percentage')


// ? vehicle details

const vdMake = document.querySelector('.vd-make')
const vdModel = document.querySelector('.vd-model')
const vdYear = document.querySelector('.vd-year')
const vdRegistered = document.querySelector('.vd-registered-emirates')
const vdFuel = document.querySelector('.vd-fuel')
const vdPlate = document.querySelector('.vd-plate')
const vdKms = document.querySelector('.vd-kms')
const vdVin = document.querySelector('.vd-vin')
const vdCylinders = document.querySelector('.vd-cylinders')



const imageOut = document.querySelector('.image-grid')
const imgLoading = document.querySelector('.img-loading')

// ? inspection - overall summary

const inspectionSummary = document.querySelector('.overall-summary')

// ? inspection details

const inspectionNumber = document.querySelector('.inspection-num')
const inspectionDate = document.querySelector('.inspection-date')
const serviceAdvisor = document.querySelector('.service-advisor')
const insepctedBy = document.querySelector('.inspected-by')

const copyrightYear = document.querySelector('.curr-year')

let currentDate = new Date();
let currYear = currentDate.getFullYear()
copyrightYear.innerText = currYear

// ? view button, generate link button, modal, link

const generateLinkBtn = document.querySelector('.generate-link-btn')
const viewLinkBtn = document.querySelector('.view-link-btn')

const popUpModal = document.querySelector('.pop-up-modal')
const modalCloseBtn = document.querySelector('.modal-close-btn')
const customerLink = document.querySelector('.customer-link')

let Tid = ''
let roleName = ''

let accessToken
let btnFlag = false

const carObj = {
    "ASTON MARTIN": "./assets/car/aston_martin.png",
    "AUDI": "./assets/car/audi.png",
    "BENTLEY": "./assets/car/bentley.png",
    "BMW": "./assets/car/bmw.png",
    "FERRARI": "./assets/car/ferrari.png",
    "JAGUAR": "./assets/car/jaguar.png",
    "LAMBORGHINI": "./assets/car/lamborghini.png",
    "RANGE ROVER": "./assets/car/land_rover.png",
    "LAND ROVER": "./assets/car/land_rover.png",
    "Lotus": "./assets/car/lotus.png",
    "MASERATI": "./assets/car/maserati.png",
    "MAYBACH": "./assets/car/maybach.png",
    "MERCEDES BENZ": "./assets/car/mercedes_benz.png",
    "MINI COOPER-A": "./assets/car/mini_cooper.png",
    "PORSCHE": "./assets/car/porsche.png",
    "ROLLS ROYCE": "./assets/car/rolls_royce.png",
    "SKODA": "./assets/car/skoda.png",
    "SMART": "./assets/car/smart.png",
    "VOLKSWAGEN": "./assets/car/volkswagen.png",
    "ASTONMARTIN": "./assets/car/aston_martin.png",
    "RANGEROVER": "./assets/car/land_rover.png",
    "LANDROVER": "./assets/car/land_rover.png",
    "MERCEDESBENZ": "./assets/car/mercedes_benz.png",
    "MINICOOPER-A": "./assets/car/mini_cooper.png",
    "ROLLSROYCE": "./assets/car/rolls_royce.png",
    "Empty": "./assets/Empty.png"
}


window.onload = () => {
    starter()
}

async function starter() {
    errorScreen.classList.add('hide')

    const encodedUrl = new URL(window.location.href);
    let idParam = encodedUrl.searchParams.get('id');
    let roleParam = encodedUrl.searchParams.get('r');
    // let typeParam = encodedUrl.searchParams.get('t');
    let genLinkBtnParam = encodedUrl.searchParams.get('glbtn');
    let viewLinkBtnParam = encodedUrl.searchParams.get('vlbtn');

    let decodedIdParam = decodeURL(idParam)
    let decodedRoleParam = decodeURL(roleParam)

    // ? decrypting logic
    let key = "s&a8Q!q#24f@L7oR";
    let decryptedTid = await CryptoJS.AES.decrypt(decodedIdParam, key).toString(CryptoJS.enc.Utf8)
    let decryptedRole = await CryptoJS.AES.decrypt(decodedRoleParam, key).toString(CryptoJS.enc.Utf8)

    Tid = decryptedTid
    roleName = decryptedRole

    // console.log(Tid);
    // console.log('r', roleName);

    getData(decryptedTid, genLinkBtnParam, viewLinkBtnParam)
}

function decodeURL(url) {
    let decodedString = decodeURIComponent(url);

    return decodedString;
}


function getData(transId, generateLinkBtnParam, viewLinkBtnParam) {

    // if (!transId) {
    //     loadingScreen.style.display = "none"
    //     loadingScreen.classList.add('hide')
    //     errorScreen.classList.remove('hide')
    //     return
    // }

    try {

        fetch('data.json')
        // fetch(`https://api.germanexperts.ae:8082/api/VehicleInspection/GetVehInspDetails/${transId}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'apiKey': 'a4db08b7-5729-4ba9-8c08-f2df493465a1'
        //     }
        // })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then(data => {
                // console.log(data);
                mainVideo.src = 'https://geapps.germanexperts.ae:7007/notificationImage/360Inspection_1.mp4'
                populateData(data)
                fetchInspectionImages(data)

                if (roleName == 'Service Advisor') {

                    showGenLinkBtn(generateLinkBtnParam, viewLinkBtnParam)
                    loadingScreen.classList.add('hide')

                } else if (roleName == 'Customer Relationship Manager' || roleName == 'General Manager' || roleName == 'Administrator') {

                    if (generateLinkBtnParam == "show") {

                        showGenLinkBtn(generateLinkBtnParam, viewLinkBtnParam)
                        loadingScreen.classList.add('hide')
                    } else {

                        showGenLinkBtn(generateLinkBtnParam, viewLinkBtnParam)
                        loadingScreen.classList.add('hide')
                    }

                } else if (roleName == '') {

                    generateLinkBtn.classList.add('hide')
                    viewLinkBtn.classList.add('hide')
                    loadingScreen.classList.add('hide')
                }


            })
            .catch(error => {
                console.log('general API', error)
                errorScreen.classList.remove('hide')
            })

    } catch (error) {
        console.log('get data try catch', error);
        errorScreen.classList.remove('hide')
    }
}


function createNewAccessToken() {

    try {

        fetch('https://geapps.germanexperts.ae:7007/api/crmservicegeneralcrmapiaccesstoken', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'apiKey': 'a4db08b7-5729-4ba9-8c08-f2df493465a1'
            },
            body: JSON.stringify({
                username: 'geappadmin.a',
                password: 'admin123'
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then(data => {
                let crmAccessToken = data.Data.accessToken
                let crmRefreshToken = data.Data.refreshToken

                fetch('https://geapps.germanexperts.ae:7007/api/crmserviceaccesstoken', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        app_id: "1",
                        crm_accesstoken: crmAccessToken,
                        crm_refreshtoken: crmRefreshToken,
                        status: "1"
                    })
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json()
                    })
                    .then(data => {

                        fetch('https://geapps.germanexperts.ae:7007/api/crmserviceaccesstokenInactive/1', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                status: "0"
                            })
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error(`HTTP error! Status: ${res.status}`);
                                }
                                return res.json()
                            })
                            .then(data => {

                                // ? calling the fetch access token again
                                starter()
                            })
                            .catch(error => {
                                console.log('changing status of old access token fetch error', error);
                                errorScreen.classList.remove('hide')
                            })

                    })
                    .catch(error => {
                        console.log('updating new access token fetch error', error);
                        errorScreen.classList.remove('hide')
                    })

            })
            .catch(error => {
                console.log('creating new access token fetch error', error);
                errorScreen.classList.remove('hide')
            })
    } catch (error) {
        console.log('creating new access token try catch error', error);
        errorScreen.classList.remove('hide')
    }
}



function populateData(data) {

    // ? brand name, model
    let records = data.records[0]

    carBrandLogo.src = carObj[records.vehicleMake__name] ? carObj[records.vehicleMake__name] : carObj.Empty

    carBrand.innerText = records.vehicleMake__name
    carModel.innerText = records.vehicleType__name
    carYear.innerText = records.vehicleModelYear


    // ? overview each section
    // ? engine compartement
    let engineCompartment = data.enginecompartment_[0]

    let engineCompartmentRatingScore = engineCompartment.enginE_RATING.split('|')[2]
    let engineCompartmentRatingPercent = ((engineCompartment.enginE_RATING.split('|')[1]/5)*100).toFixed(0)

    engineCompartmentPercentageText.innerText = engineCompartmentRatingPercent + '%'
    engineCompartmentPercentage.style.width = engineCompartmentRatingPercent + '%'
    engineCompartmentPercentage.style.backgroundColor = percentageColorPicker(engineCompartmentRatingPercent)
    // ? accordion header
    engineCompartmentPercentageAccordion.innerText = engineCompartmentRatingPercent + '%'
    engineCompartmentPercentageAccordion.style.backgroundColor = percentageColorPicker(engineCompartmentRatingPercent)

    // ? transmission
    let transmission = data.transmissions_[0]

    let transmissionRatingScore = transmission.transmissioN_RATING.split('|')[2]
    let transmissionRatingPercent = ((transmission.transmissioN_RATING.split('|')[1]/5)*100).toFixed(0)

    transmissionPercentageText.innerText = transmissionRatingPercent + '%'
    transmissionPercentage.style.width = transmissionRatingPercent + '%'
    transmissionPercentage.style.backgroundColor = percentageColorPicker(transmissionRatingPercent)
    // ? accordion header
    transmissionPercentageAccordion.innerText = transmissionRatingPercent + '%'
    transmissionPercentageAccordion.style.backgroundColor = percentageColorPicker(transmissionRatingPercent)

    // ? electrical controls
    let electricalControls = data.electricalControls_[0]

    let electricalControlsRatingScore = electricalControls.electricaL_RATING.split('|')[2]
    let electricalControlsRatingPercent = ((electricalControls.electricaL_RATING.split('|')[1]/5)*100).toFixed(0)

    electricalControlsPercentageText.innerText = electricalControlsRatingPercent + '%'
    electricalControlsPercentage.style.width = electricalControlsRatingPercent + '%'
    electricalControlsPercentage.style.backgroundColor = percentageColorPicker(electricalControlsRatingPercent)
    // ? accordion header
    electricalControlsPercentageAccordion.innerText = electricalControlsRatingPercent + '%'
    electricalControlsPercentageAccordion.style.backgroundColor = percentageColorPicker(electricalControlsRatingPercent)

    // ? brake system
    let brakeSystem = data.brakeSystem_[0]

    let brakeSystemRatingScore = brakeSystem.brakesyS_RATING.split('|')[2]
    let brakeSystemRatingPercent = ((brakeSystem.brakesyS_RATING.split('|')[1]/5)*100).toFixed(0)

    brakeSystemPercentageText.innerText = brakeSystemRatingPercent + '%'
    brakeSystemPercentage.style.width = brakeSystemRatingPercent + '%'
    brakeSystemPercentage.style.backgroundColor = percentageColorPicker(brakeSystemRatingPercent)
    // ? accordion header
    brakeSystemPercentageAccordion.innerText = brakeSystemRatingPercent + '%'
    brakeSystemPercentageAccordion.style.backgroundColor = percentageColorPicker(brakeSystemRatingPercent)


    // ? front suspension
    let frontSuspension = data.frontSuspension_[0]

    let frontSuspensionRatingScore = frontSuspension.frontsuS_RATING.split('|')[2]
    let frontSuspensionRatingPercent = ((frontSuspension.frontsuS_RATING.split('|')[1]/5)*100).toFixed(0)

    frontSuspensionPercentageText.innerText = frontSuspensionRatingPercent + '%'
    frontSuspensionPercentage.style.width = frontSuspensionRatingPercent + '%'
    frontSuspensionPercentage.style.backgroundColor = percentageColorPicker(frontSuspensionRatingPercent)
    // ? accordion header
    frontSuspensionPercentageAccordion.innerText = frontSuspensionRatingPercent + '%'
    frontSuspensionPercentageAccordion.style.backgroundColor = percentageColorPicker(frontSuspensionRatingPercent)

    // ? rear suspension
    let rearSuspension = data.rearSuspension_[0]

    let rearSuspensionRatingScore = rearSuspension.rearsuS_RATING.split('|')[2]
    let rearSuspensionRatingPercent = ((rearSuspension.rearsuS_RATING.split('|')[1]/5)*100).toFixed(0)

    rearSuspensionPercentageText.innerText = rearSuspensionRatingPercent + '%'
    rearSuspensionPercentage.style.width = rearSuspensionRatingPercent + '%'
    rearSuspensionPercentage.style.backgroundColor = percentageColorPicker(rearSuspensionRatingPercent)
    // ? accordion header
    rearSuspensionPercentageAccordion.innerText = rearSuspensionRatingPercent + '%'
    rearSuspensionPercentageAccordion.style.backgroundColor = percentageColorPicker(rearSuspensionRatingPercent)

    // ? steering
    let steering = data.steering_[0]

    let steeringRatingScore = steering.steerinG_RATING.split('|')[2]
    let steeringRatingPercent = ((steering.steerinG_RATING.split('|')[1]/5)*100).toFixed(0)

    steeringPercentageText.innerText = steeringRatingPercent + '%'
    steeringPercentage.style.width = steeringRatingPercent + '%'
    steeringPercentage.style.backgroundColor = percentageColorPicker(steeringRatingPercent)
    // ? accordion header
    steeringPercentageAccordion.innerText = steeringRatingPercent + '%'
    steeringPercentageAccordion.style.backgroundColor = percentageColorPicker(steeringRatingPercent)

    // ? interior
    let interior = data.interior_[0]

    let interiorRatingScore = interior.interioR_RATING.split('|')[2]
    let interiorRatingPercent = ((interior.interioR_RATING.split('|')[1]/5)*100).toFixed(0)

    interiorPercentageText.innerText = interiorRatingPercent + '%'
    interiorPercentage.style.width = interiorRatingPercent + '%'
    interiorPercentage.style.backgroundColor = percentageColorPicker(interiorRatingPercent)
    // ? accordion header
    interiorPercentageAccordion.innerText = interiorRatingPercent + '%'
    interiorPercentageAccordion.style.backgroundColor = percentageColorPicker(interiorRatingPercent)

    // ? underbody
    let underBody = data.underBody_[0]

    let underBodyRatingScore = underBody.underbodY_RATING.split('|')[2]
    let underBodyRatingPercent = ((underBody.underbodY_RATING.split('|')[1]/5)*100).toFixed(0)

    underBodyPercentageText.innerText = underBodyRatingPercent + '%'
    underBodyPercentage.style.width = underBodyRatingPercent + '%'
    underBodyPercentage.style.backgroundColor = percentageColorPicker(underBodyRatingPercent)
    // ? accordion header
    underBodyPercentageAccordion.innerText = underBodyRatingPercent + '%'
    underBodyPercentageAccordion.style.backgroundColor = percentageColorPicker(underBodyRatingPercent)

    // ? fuel system
    let fuelSystem = data.fuelSystem_[0]

    let fuelSystemRatingScore = fuelSystem.fuelsyS_RATING.split('|')[2]
    let fuelSystemRatingPercent = ((fuelSystem.fuelsyS_RATING.split('|')[1]/5)*100).toFixed(0)

    fuelSystemPercentageText.innerText = fuelSystemRatingPercent + '%'
    fuelSystemPercentage.style.width = fuelSystemRatingPercent + '%'
    fuelSystemPercentage.style.backgroundColor = percentageColorPicker(fuelSystemRatingPercent)
    // ? accordion header
    fuelSystemPercentageAccordion.innerText = fuelSystemRatingPercent + '%'
    fuelSystemPercentageAccordion.style.backgroundColor = percentageColorPicker(fuelSystemRatingPercent)

    // ? exterior
    let exterior = data.exterior_[0]

    let exteriorRatingScore = exterior.exterioR_RATING.split('|')[2]
    let exteriorRatingPercent = ((exterior.exterioR_RATING.split('|')[1]/5)*100).toFixed(0)

    exteriorPercentageText.innerText = exteriorRatingPercent + '%'
    exteriorPercentage.style.width = exteriorRatingPercent + '%'
    exteriorPercentage.style.backgroundColor = percentageColorPicker(exteriorRatingPercent)
    // ? accordion header
    exteriorPercentageAccordion.innerText = exteriorRatingPercent + '%'
    exteriorPercentageAccordion.style.backgroundColor = percentageColorPicker(exteriorRatingPercent)

    // ? wheels and tyres
    let wheelsAndTyres = data.wheelsAndTyres_[0]

    let wheelsAndTyresRatingScore = wheelsAndTyres.wheelsntyrE_RATING.split('|')[2]
    let wheelsAndTyresRatingPercent = ((wheelsAndTyres.wheelsntyrE_RATING.split('|')[1]/5)*100).toFixed(0)

    wheelsAndTyresPercentageText.innerText = wheelsAndTyresRatingPercent + '%'
    wheelsAndTyresPercentage.style.width = wheelsAndTyresRatingPercent + '%'
    wheelsAndTyresPercentage.style.backgroundColor = percentageColorPicker(wheelsAndTyresRatingPercent)
    // ? accordion header
    wheelsAndTyresPercentageAccordion.innerText = wheelsAndTyresRatingPercent + '%'
    wheelsAndTyresPercentageAccordion.style.backgroundColor = percentageColorPicker(wheelsAndTyresRatingPercent)

    // ? exhaust system
    let exhaustSystem = data.exhaustSystem_[0]

    let exhaustSystemRatingScore = exhaustSystem.exhaustsyS_RATING.split('|')[2]
    let exhaustSystemRatingPercent = ((exhaustSystem.exhaustsyS_RATING.split('|')[1]/5)*100).toFixed(0)

    exhaustSystemPercentageText.innerText = exhaustSystemRatingPercent + '%'
    exhaustSystemPercentage.style.width = exhaustSystemRatingPercent + '%'
    exhaustSystemPercentage.style.backgroundColor = percentageColorPicker(exhaustSystemRatingPercent)
    // ? accordion header
    exhaustSystemPercentageAccordion.innerText = exhaustSystemRatingPercent + '%'
    exhaustSystemPercentageAccordion.style.backgroundColor = percentageColorPicker(exhaustSystemRatingPercent)

    // ? drive train
    let driveTrain = data.driveTrain_[0]

    let driveTrainRatingScore = driveTrain.drivetraiN_RATING.split('|')[2]
    let driveTrainRatingPercent = ((driveTrain.drivetraiN_RATING.split('|')[1]/5)*100).toFixed(0)

    driveTrainPercentageText.innerText = driveTrainRatingPercent + '%'
    driveTrainPercentage.style.width = driveTrainRatingPercent + '%'
    driveTrainPercentage.style.backgroundColor = percentageColorPicker(driveTrainRatingPercent)
    // ? accordion header
    driveTrainPercentageAccordion.innerText = driveTrainRatingPercent + '%'
    driveTrainPercentageAccordion.style.backgroundColor = percentageColorPicker(driveTrainRatingPercent)

    // ? suspension
    let suspension = data.suspension_[0]

    let suspensionRatingScore = suspension.suspensioN_RATING.split('|')[2]
    let suspensionRatingPercent = ((suspension.suspensioN_RATING.split('|')[1]/5)*100).toFixed(0)

    suspensionPercentageText.innerText = suspensionRatingPercent + '%'
    suspensionPercentage.style.width = suspensionRatingPercent + '%'
    suspensionPercentage.style.backgroundColor = percentageColorPicker(suspensionRatingPercent)
    // ? accordion header
    suspensionPercentageAccordion.innerText = suspensionRatingPercent + '%'
    suspensionPercentageAccordion.style.backgroundColor = percentageColorPicker(suspensionRatingPercent)

    // ? obd
    let obd = data.obdDiagnosticCodes_[0]

    let obdRatingScore = obd.obD_RATING.split('|')[2]
    let obdRatingPercent = ((obd.obD_RATING.split('|')[1]/5)*100).toFixed(0)

    obdPercentageText.innerText = obdRatingPercent + '%'
    obdPercentage.style.width = obdRatingPercent + '%'
    obdPercentage.style.backgroundColor = percentageColorPicker(obdRatingPercent)
    // ? accordion header
    obdPercentageAccodion.innerText = obdRatingPercent + '%'
    obdPercentageAccodion.style.backgroundColor = percentageColorPicker(obdRatingPercent)


    // ? ac system
    let acSystem = data.acSystem_[0]

    let acSystemRatingScore = acSystem.acsysteM_RATING.split('|')[2]
    let acSystemRatingPercent = ((acSystem.acsysteM_RATING.split('|')[1]/5)*100).toFixed(0)

    acSystemPercentageText.innerText = acSystemRatingPercent + '%'
    acSystemPercentage.style.width = acSystemRatingPercent + '%'
    acSystemPercentage.style.backgroundColor = percentageColorPicker(acSystemRatingPercent)
    // ? accordion header
    acSystemPercentageAccordion.innerText = acSystemRatingPercent + '%'
    acSystemPercentageAccordion.style.backgroundColor = percentageColorPicker(acSystemRatingPercent)



    // ? road test and final checks
    let roadTest = data.roadTestNFinalChecks_[0]

    let roadTestRatingScore = roadTest.roaD_TEST_RATING.split('|')[2]
    let roadTestRatingPercent = ((roadTest.roaD_TEST_RATING.split('|')[1]/5)*100).toFixed(0)

    roadTestPercentageText.innerText = roadTestRatingPercent + '%'
    roadTestPercentage.style.width = roadTestRatingPercent + '%'
    roadTestPercentage.style.backgroundColor = percentageColorPicker(roadTestRatingPercent)
    // ? accordion header
    roadTestPercentageAccordion.innerText = roadTestRatingPercent + '%'
    roadTestPercentageAccordion.style.backgroundColor = percentageColorPicker(roadTestRatingPercent)


    // ? overall rating

    let engineCompartmentRating = new Decimal(engineCompartmentRatingScore)
    let transmissionRating = new Decimal(transmissionRatingScore)
    let electricalRating = new Decimal(electricalControlsRatingScore)
    let brakeRating = new Decimal(brakeSystemRatingScore)
    let frontSusRating = new Decimal(frontSuspensionRatingScore)
    let rearSusRating = new Decimal(rearSuspensionRatingScore)
    let steeringRating = new Decimal(steeringRatingScore)
    let interiorRating = new Decimal(interiorRatingScore)
    let underbodyRating = new Decimal(underBodyRatingScore)
    let fuelRating = new Decimal(fuelSystemRatingScore)
    let exteriorRating = new Decimal(exteriorRatingScore)
    let wheelsRating = new Decimal(wheelsAndTyresRatingScore)
    let exhaustRating = new Decimal(exhaustSystemRatingScore)
    let drivetrainRating = new Decimal(driveTrainRatingScore)
    let susRating = new Decimal(suspensionRatingScore)
    let obdRating = new Decimal(obdRatingScore)
    let acRating = new Decimal(acSystemRatingScore)
    let roadtestRating = new Decimal(roadTestRatingScore)


    let ratingSum = engineCompartmentRating.plus(transmissionRating)
                        .plus(electricalRating)
                        .plus(brakeRating)
                        .plus(frontSusRating)
                        .plus(rearSusRating)
                        .plus(steeringRating)
                        .plus(interiorRating)
                        .plus(underbodyRating)
                        .plus(fuelRating)
                        .plus(exteriorRating)
                        .plus(wheelsRating)
                        .plus(exhaustRating)
                        .plus(drivetrainRating)
                        .plus(susRating)
                        .plus(obdRating)
                        .plus(acRating)
                        .plus(roadtestRating)
    
    let formatedSum = ratingSum.toFixed(2)

    overallRatingText.innerText = formatedSum

    createStarRating(parseFloat(formatedSum))


    // ? vehicle details

    vdMake.innerText = records.vehicleMake__name
    vdModel.innerText = records.vehicleType__name
    vdYear.innerText = records.vehicleModelYear
    vdRegistered.innerText = records.branchName
    vdFuel.innerText = records.fuelTypeName
    vdPlate.innerText = records.plate_no
    vdKms.innerText = records.current_km
    vdVin.innerText = records.chassis_no
    vdCylinders.innerText = records.engine_type

    // ? inspection detailed accorion

    populateAccordion(data)

    // ? insepction - overall summary

    inspectionSummary.innerText = records.summary_Remarks

    // ? insepction details

    inspectionNumber.innerText = records.doc__Name
    inspectionDate.innerText = records.createdDate.split(' ')[0]
    serviceAdvisor.innerText = records.service_advisor
    insepctedBy.innerText = records.team_leader

}


function createStarRating(rating) {
    const maxStars = 5;
    const starContainer = document.getElementById('star-container');
    starContainer.innerHTML = ''; // Clear previous stars

    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        if (rating >= i + 1) {
            // Fully filled star
            star.classList.add('filled');
        } else if (rating > i && rating < i + 1) {
            // Partially filled star
            star.classList.add('partial');
            
            // Extract the fractional part of the rating
            const fraction = rating - i;
            let adjustment = 0;

            // Apply different adjustments based on how close the fraction is to 0.5
            if (fraction > 0.5) {
                adjustment = 0.1; // If closer to 1, apply larger adjustment
            } else {
                adjustment = 0.05; // If smaller, apply a lighter adjustment
            }

            const percentage = (fraction - adjustment) * 100;
            star.style.setProperty('--percent', `${Math.max(0, Math.min(percentage, 100))}%`);
        }

        starContainer.appendChild(star);
    }
}

function percentageColorPicker(percent) {

    if (percent >= 76) {
        return '#5AC35A'
    } else if (percent >= 51 && percent <= 75) {
        return '#FFB231'
    } else if (percent >= 26 && percent <= 50) {
        return '#FF793E'
    } else if (percent <= 25) {
        return '#E63946'
    }

}


function appendAccordionText(location, value) {

    if (value == "OK") {
        location.innerText = "No Visible Faults"
        location.classList.add('ok')
    } else if (value == "NOK") {
        location.innerText = "Faulty"
        location.classList.add('nok')
    } else if (value == "CHK") {
        location.innerText = "Requires Future Attention"
        location.classList.add('chk')
    } else if (value == "NA") {
        location.innerText = "Not Applicable"
        location.classList.add('na')
    } else {
        location.innerText = value
    }

    // console.log(location);
}

function populateAccordion(data) {
    // ? brand name, model
    let records = data.records[0]
    let engineCompartment = data.enginecompartment_[0]
    let transmission = data.transmissions_[0]
    let electricalControls = data.electricalControls_[0]
    let brakeSystem = data.brakeSystem_[0]
    let frontSuspension = data.frontSuspension_[0]
    let rearSuspension = data.rearSuspension_[0]
    let steering = data.steering_[0]
    let interior = data.interior_[0]
    let underBody = data.underBody_[0]
    let fuelSystem = data.fuelSystem_[0]
    let exterior = data.exterior_[0]
    let bodyshop = data.bodyShop_[0]
    let wheelsAndTyres = data.wheelsAndTyres_[0]
    let exhaustSystem = data.exhaustSystem_[0]
    let driveTrain = data.driveTrain_[0]
    let suspension = data.suspension_[0]
    let obd = data.obdDiagnosticCodes_[0]
    let acSystem = data.acSystem_[0]
    let roadTest = data.roadTestNFinalChecks_[0]

    // ? engine compartement

    appendAccordionText(document.querySelector('.chk-bonnet-lock-switch-cable'), engineCompartment.chkBontLock_switch_cable)
    appendAccordionText(document.querySelector('.all-hoses-crack-damages-leaks'), engineCompartment.all_hoses)
    appendAccordionText(document.querySelector('.filters-and-spark-plugs'), engineCompartment.filter_spark_plug)
    appendAccordionText(document.querySelector('.ancillary-component-condition'), engineCompartment.timingbelt_accCondition)
    appendAccordionText(document.querySelector('.coolant-pump-external-condition-and-faults'), engineCompartment.coolent_pump_ex_cond)
    appendAccordionText(document.querySelector('.radiator-fan-function-and-condition'), engineCompartment.radfan_fun_n_cond)
    appendAccordionText(document.querySelector('.engine-oil-level-and-condition'), engineCompartment.engine_oil)
    appendAccordionText(document.querySelector('.engine-wiring-harness-overall-condition'), engineCompartment.wiring_harnes_overall_cond)
    appendAccordionText(document.querySelector('.compression-test-result'), engineCompartment.compress_test)
    appendAccordionText(document.querySelector('.turbo-and-super-charger-condition'), engineCompartment.turbo_n_Super_charger_condition)
    appendAccordionText(document.querySelector('.no-engine-fault'), engineCompartment.engine_Fault)
    appendAccordionText(document.querySelector('.engine-performance-at-idle'), engineCompartment.engine_perfomance_at_idle)
    appendAccordionText(document.querySelector('.v-belt-idler-pulley-and-tensioner-condition'), engineCompartment.vbelt_idlerpullys_tension_cond)
    appendAccordionText(document.querySelector('.no-engine-noise'), engineCompartment.engine_noise)
    appendAccordionText(document.querySelector('.engine-mount-condition'), engineCompartment.engine_mount_check)
    appendAccordionText(document.querySelector('.check-coolant-circuit'), engineCompartment.chk_coolntlevel_n_cond_cool_tank)
    appendAccordionText(document.querySelector('.windscreen-washer-fluid-level-and-reservoir-cap'), engineCompartment.windscreen_washer_fluid_lvl_n_reser_cap)
    appendAccordionText(document.querySelector('.engine-condition'), engineCompartment.engine_Condition)
    appendAccordionText(document.querySelector('.engine-compartment-remark'), engineCompartment.enginE_CONDITION_REMARKS)

    // ? transmission

    appendAccordionText(document.querySelector('.transmission-mount-condition'), transmission.transmission_mount_check)
    appendAccordionText(document.querySelector('.transmission-housing-condition'), transmission.transmission_housing_condition)
    appendAccordionText(document.querySelector('.transmission-oil-condition'), transmission.transmission_oil_condition)
    appendAccordionText(document.querySelector('.no-transmission-faults'), transmission.transmission_faults)
    appendAccordionText(document.querySelector('.transmission-condition'), transmission.transmission_condition)
    appendAccordionText(document.querySelector('.transmission-remarks'), transmission.transmissioN_REMARKS)

    // ? electrical controls

    appendAccordionText(document.querySelector('.switches-condition'), electricalControls.switcheS_CONDITION)
    appendAccordionText(document.querySelector('.all-seat-adjustment-functionality'), electricalControls.alL_SEAT_ADJUSTMENT_FUNCTIONALITY)
    appendAccordionText(document.querySelector('.gear-shifter-function-and-condition'), electricalControls.geaR_SHIFTER_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.battery-test-result'), electricalControls.batterY_TEST_RESULT_AND_REMARKS)
    appendAccordionText(document.querySelector('.side-mirrors-adjustment-function'), electricalControls.sidE_MIRRORS_ADJUSTMENT_FUNCTION)
    appendAccordionText(document.querySelector('.steering-wheel-adjustment-function-and-condition'), electricalControls.steerinG_WHEEL_ADJUSTMENT_FUNCTION_CONDITION)
    appendAccordionText(document.querySelector('.interior-electronics-and-system-functionality'), electricalControls.interioR_ELECTRONIC_SYSTEM_FUNCTIONALITY)
    appendAccordionText(document.querySelector('.all-lights-function'), electricalControls.alL_LIGHTS_FUNCTION)
    appendAccordionText(document.querySelector('.infotainment-system-function-and-condition'), electricalControls.infotainmenT_SYSTEM_FUNCTION_CONDITION)

    // ? brake system

    appendAccordionText(document.querySelector('.parking-brake-functionality'), brakeSystem.parkinG_BRAKE_FUNCTIONALITY)
    appendAccordionText(document.querySelector('.front-brake-pad-thickness'), brakeSystem.fronT_BRAKE_PAD_THICKNESS)
    appendAccordionText(document.querySelector('.front-and-rear-brake-disc-thickness'), brakeSystem.fronT_BRAKE_DISC_ACTUAL_THICKNESS)
    appendAccordionText(document.querySelector('.rear-brake-pad-thickness'), brakeSystem.reaR_BRAKE_PAD_THICKNESS)
    appendAccordionText(document.querySelector('.brake-lines-and-brake-calipers-condition'), brakeSystem.brakE_LINES_BRAKE_CALIPER_CONDITION)
    appendAccordionText(document.querySelector('.brake-fluid-level-reservoir-and-cap-check'), brakeSystem.brakE_FLUID_LEVEL_RESERVOIR_N_CAP_CHECK)

    // ? front suspension

    appendAccordionText(document.querySelector('.front-sub-frame-fixing-and-condition'), frontSuspension.fronT_SUB_FRAME_FIXING_CONDITION)
    appendAccordionText(document.querySelector('.front-arms-suspension-stabilizers-bar-link-and-bushes'), frontSuspension.fronT_SUSPENSION_SWAY_BARS_LINKS_BUSHINGS)
    appendAccordionText(document.querySelector('.front-suspension-struts-mounts-and-springs'), frontSuspension.fronT_SUSPENSION_STRUTS_SOCKS_N_SPRING)

    // ? rear suspension

    appendAccordionText(document.querySelector('.rear-sub-frame-fixing-and-condition'), rearSuspension.reaR_SUB_FRAME_FIXING_CONDITION)
    appendAccordionText(document.querySelector('.rear-arms-suspension-stabilizer-bar-links-and-bushes'), rearSuspension.reaR_SUSPENSION_SWAY_BARS_LINKS_BUSHINGS)
    appendAccordionText(document.querySelector('.rear-suspension-structs-shocks-and-springs'), rearSuspension.reaR_SUSPENSION_STRUCTS_SHOCKS_AND_SPRINGS)

    // ? steering

    appendAccordionText(document.querySelector('.power-steering-fluid-level-quality-and-reservoir-cap'), steering.poweR_STEERING_FLUID_LEVEL_RESERVOIR_CAP)
    appendAccordionText(document.querySelector('.steering-tierods-racks-gaiters-integrity-play-noise-and-leak-check'), steering.steerinG_ARMS_RACK_AND_BOOTS_INTEGRITY_AND_LEAK_CHECK)
    appendAccordionText(document.querySelector('.check-power-steering-pump-hoses-leaks'), engineCompartment.chk_power_steering_pumb_hoses_for_leakage)
    appendAccordionText(document.querySelector('.no-eps-fault-and-server-motor-noise'), steering.electriC_MOTOR_NOISE)

    // ? interior

    appendAccordionText(document.querySelector('.warning-lights-on-esc-airbag-and-mil'), interior.warninG_LIGHTS_ON_ESC_AIRBAG_MIL)
    appendAccordionText(document.querySelector('.all-seat-belt-condition-and-functionality'), interior.alL_SEAT_BELT_CONDITION_FUNCTIONALITY)
    appendAccordionText(document.querySelector('.child-lock-function'), interior.chilD_LOCK_FUNCTION)
    appendAccordionText(document.querySelector('.vehicle-interior-condition'), interior.vehiclE_INTERIOR_CONDITION)
    appendAccordionText(document.querySelector('.refrigeration-box-function-and-condition'), interior.coolinG_BOX_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.panaromic-sunroof-condition-and-function'), interior.panoramiC_SUNROOF_CONDITION_FUNCTION)
    appendAccordionText(document.querySelector('.rear-sunshade-curtain-function-and-condition'), interior.reaR_SUNSHADE_CURTAIN_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.bonnet-release-handle-function-and-condition'), interior.bonneT_RELEASE_HANDLE_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.starting-function'), interior.startinG_FUNCTION)
    appendAccordionText(document.querySelector('.no-unauthorized-modification-found'), interior.nO_UNAUTHORIZED_MODIFICATION_FOUND)
    appendAccordionText(document.querySelector('.wind-screen-wiper-blade-and-washer-control-system'), interior.winD_SCREEN_WIPER_BLADE_WASHER_CONTROL_SYSTEM)
    appendAccordionText(document.querySelector('.glove-box-perfume-atomizer-function-and-condition'), interior.glovE_BOX_PERFUME_ATOMIZER_FUNCTION_AND_CONDITION)

    // ? underbody

    appendAccordionText(document.querySelector('.no-signs-of-oil-leaks'), underBody.signS_OF_OIL_LEAKS)
    appendAccordionText(document.querySelector('.no-signs-of-coolant-leaks'), underBody.signS_OF_COOLANT_LEAKS)
    appendAccordionText(document.querySelector('.underbody-covers-heat-shields-and-running-board-fixing-and-condition'), underBody.underbodY_COVERS_AND_HEAT_SHIELDS_FIXING_CONDITION)
    appendAccordionText(document.querySelector('.front-and-rear-bumpers-under-panels-condition'), underBody.bottoM_OF_FRONT_AND_REAR_BUMPERS_VISUAL_DAMAGE)
    appendAccordionText(document.querySelector('.wheel-housing-covers-condition'), underBody.wheeL_HOUSING_COVERS_CONDITION)
    appendAccordionText(document.querySelector('.chassis-condition'), underBody.chassiS_CONDITION)
    appendAccordionText(document.querySelector('.underbody-remarks'), underBody.underbodY_REMARKS)

    // ? fuel system

    appendAccordionText(document.querySelector('.fuel-system-pump-lines-rails-and-injectors-condition'), fuelSystem.fuel_system_pump_lines_rails_injectors_condition)
    appendAccordionText(document.querySelector('.fuel-tank-and-fuel-lines-condition'), fuelSystem.fuel_Tank_Fuel_Lines_Condition)

    // ? exterior

    appendAccordionText(document.querySelector('.all-exterior-lights-physical-condition'), exterior.alL_LIGHTS_PHYSICAL_CONDITION)
    appendAccordionText(document.querySelector('.all-side-mirror-housing-and-glass-condition'), exterior.alL_SIDE_MIRROR_HOUSING_AND_GLASS)
    appendAccordionText(document.querySelector('.convertible-soft-top-condition'), exterior.convertiblE_SOFT_TOP_CONDITION)
    appendAccordionText(document.querySelector('.windscreen-and-windshield-glass-condition'), exterior.windscreeN_GLASS)
    appendAccordionText(document.querySelector('.no-body-modification-and-customisation'), exterior.checkinG_FOR_BODY_MODIFICATIONS)
    appendAccordionText(document.querySelector('.all-door-handle-open-close-functionality'), exterior.alL_DOOR_HANDLE_OPEN_CLOSE_FUNCTIONALITY)
    appendAccordionText(document.querySelector('.no-scratch'), bodyshop.scratch)
    appendAccordionText(document.querySelector('.faded'), bodyshop.faded)
    appendAccordionText(document.querySelector('.foil-wrap-and-paint-protection-film-condition'), bodyshop.foilwrap)
    appendAccordionText(document.querySelector('.fuel-lid-correctly-locking-and-unlocking'), exterior.fueL_LID_CORRECTLY_LOCKING_AND_UNLOCKING)
    appendAccordionText(document.querySelector('.automatic-trunk-lid-opening-and-closing-function'), exterior.automatiC_TRUNK_LID_OPENING_0AND_CLOSING_FUNCTION)
    appendAccordionText(document.querySelector('.head-light-washer-system-function-and-condition'), exterior.heaD_LIGHTS_WASHER_SYSTEM_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.no-dent'), bodyshop.dent)
    appendAccordionText(document.querySelector('.re-painted'), bodyshop.repainted)
    appendAccordionText(document.querySelector('.no-paint-bubble-and-rust'), bodyshop.paintbubblerest)


    // ? wheels and tyres

    appendAccordionText(document.querySelector('.all-rim-condition'), wheelsAndTyres.alL_RIM_CONDITION)
    appendAccordionText(document.querySelector('.all-tires-have-the-same-brand'), wheelsAndTyres.alL_TIRES_HAVE_THE_SAME_BRAND)
    appendAccordionText(document.querySelector('.tyre-front-left-thread-depth-and-evenness'), wheelsAndTyres.tyrE_FRONT_LEFT_THREAD_DEPTH_EVENNESS)
    appendAccordionText(document.querySelector('.tyre-rear-left-thread-depth-and-evenness'), wheelsAndTyres.tyrE_REAR_LEFT_THREAD_DEPTH_EVENNESS)
    appendAccordionText(document.querySelector('.tyre-front-right-thread-depth-and-evenness'), wheelsAndTyres.tyrE_FRONT_RIGHT_THREAD_DEPTH_EVENNESS)
    appendAccordionText(document.querySelector('.tyre-rear-right-thread-depth-and-evenness'), wheelsAndTyres.tyrE_REAR_RIGHT_THREAD_DEPTH_EVENNESS)

    // ? exhaust system

    appendAccordionText(document.querySelector('.exhaust-system-condition'), exhaustSystem.exhausT_SYSTEM_CONDITION)
    appendAccordionText(document.querySelector('.no-exhaust-modification-found'), exhaustSystem.exhausT_MODIFIED)
    appendAccordionText(document.querySelector('.exhaust-system-flap-condition'), exhaustSystem.exhausT_FLAP)

    // ? drive train

    appendAccordionText(document.querySelector('.axle-shafts-gaiters-and-cv-joints-condition'), driveTrain.cV_JOINTS_BOOTS)
    appendAccordionText(document.querySelector('.front-differential-oil-condition'), driveTrain.differentiaL_OIL_CONDITION)
    appendAccordionText(document.querySelector('.check-front-and-rear-differential-mounts'), driveTrain.checK_DIFFERENTIAL_FRONT_REAR_MOUNTS)
    appendAccordionText(document.querySelector('.rear-differential-oil-condition'), driveTrain.differentiaL_OIL_REAR_CONDITION)
    appendAccordionText(document.querySelector('.propeller-shaft-and-flex-disks-condition'), driveTrain.propelleR_SHAFT_FLEX_DISKS_CONDITION)
    appendAccordionText(document.querySelector('.center-support-bearing-automatic-transmission'), driveTrain.centeR_SUPPORT_BEARING_AUTOMATIC_TRANSMISSION)
    appendAccordionText(document.querySelector('.transfer-case-oil-condition'), driveTrain.transfeR_CASE_OIL_CONDITION)
    appendAccordionText(document.querySelector('.differential-locks-function-and-condition'), driveTrain.differentiaL_LOCKS_FUNCTION_AND_CONDITION)

    // ? suspension

    appendAccordionText(document.querySelector('.air-suspension-compressor-function-and-condition'), suspension.aiR_SUSPENSION_COMPRESSOR_FUNCTION_CONDITION)
    appendAccordionText(document.querySelector('.air-or-hydraulic-suspension-lines-condition'), suspension.aiR_HYDRAULIC_SUSPENSION_LINES_CONDITION)
    appendAccordionText(document.querySelector('.suspension-valve-block-function-and-condition'), suspension.suspensioN_VALVE_BLOCK_FUNCTION_AND_CONDITION)
    appendAccordionText(document.querySelector('.hydraulic-suspension-pump-function-and-condition'), engineCompartment.hydraulic_suspension_pump_fun_n_condition)
    appendAccordionText(document.querySelector('.hydraulic-suspension-oil-level-and-condition'), engineCompartment.hydrolicsusp_oillevel_condition)
    appendAccordionText(document.querySelector('.all-wheel-bearing-condition'), wheelsAndTyres.alL_WHEEL_BEARINGS_CONDITION)

    // ? obd

    appendAccordionText(document.querySelector('.no-mileage-modification'), obd.checkinG_IF_MILEAGE_MODIFIED)
    appendAccordionText(document.querySelector('.stored-messages-on-board-computer'), obd.storeD_MESSAGES_ON_BOARD_COMPUTER)
    appendAccordionText(document.querySelector('.no-service-due-data'), interior.servicE_DUE_DATA_REMARK_BOX)
    appendAccordionText(document.querySelector('.obd-remarks'), obd.obD_REMARKS)

    // ? ac system

    appendAccordionText(document.querySelector('.ac-gas-quantity'), acSystem.acgasquantity)
    appendAccordionText(document.querySelector('.ac-gas-quality'), acSystem.acgasquality)
    appendAccordionText(document.querySelector('.ac-compressor-condition'), acSystem.accomprossercondition)
    appendAccordionText(document.querySelector('.ac-blower'), acSystem.acblower)
    appendAccordionText(document.querySelector('.ac-fan'), acSystem.acfan)
    appendAccordionText(document.querySelector('.air-conditioning-components-vents-blower-and-stratfication-control'), interior.aiR_CONDITIONING_COMPONENTS_VENTS_BLOWER_CONTROLS)
    appendAccordionText(document.querySelector('.no-ac-fault'), acSystem.acfault)
    appendAccordionText(document.querySelector('.ac-control-unit-functionning-or-condition'), acSystem.accontrolunitfunction)


    // ? road test and final checks

    appendAccordionText(document.querySelector('.ac-performance'), roadTest.acperfomanceroadtest)
    appendAccordionText(document.querySelector('.fwd-operation'), roadTest.fwdoperation)
    appendAccordionText(document.querySelector('.engine-performance'), roadTest.engineperformance)
    appendAccordionText(document.querySelector('.suspension-performance'), roadTest.suspensionperformance)
    appendAccordionText(document.querySelector('.drivability-condition'), roadTest.drivabilitycondition)
    appendAccordionText(document.querySelector('.instruments-and-controls'), roadTest.instrumentsncontrols)
    appendAccordionText(document.querySelector('.brake-operation'), roadTest.brakeoperation)
    appendAccordionText(document.querySelector('.transmission-performance'), roadTest.transmissionperformance)
    appendAccordionText(document.querySelector('.drive-assistance-system'), roadTest.driverassistancesystems)
    appendAccordionText(document.querySelector('.tires'), roadTest.tires)

}


// Function to toggle the accordion
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const headerArrow = header.querySelector('.header-arrow img')

    if (headerArrow.src.split('/').pop().split('.')[0] == 'down') {
        headerArrow.src = './assets/up.png'
    } else {
        headerArrow.src = './assets/down.png'
    }

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        // content.style.padding = '0 10px';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        // content.style.padding = '10px';
    }
}

// Function to update all expanded sections on window resize
function updateAccordionOnResize() {
    document.querySelectorAll('.accordion-content').forEach(content => {
        if (content.style.maxHeight) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
}

// Add click event listener to each accordion header
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => toggleAccordion(header));
});

// Add resize event listener to update accordion on window resize
window.addEventListener('resize', updateAccordionOnResize);



function fetchInspectionImages(data) {
    try {

        fetch('https://geapps.germanexperts.ae:7007/api/crmservicegetaccesstokenByStatus/Active/1')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then(accessdata => {

                if (accessdata.length == 0 && Array.isArray(accessdata)) {
                    console.log('token empty array');
                    createNewAccessToken()
                    return
                }

                accessToken = accessdata[0].crm_accesstoken
                // console.log(data.records[0].doc__Name);


                fetch(`https://geapps.germanexperts.ae:7007/api/generalinspdocumentimagesnew/${data.records[0].doc__Name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': accessToken
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json()
                    })
                    .then(data => {
                        // console.log(data);

                        if (data.Message == "Get Technician Inspection List unsuccessfully") {
                            console.log('image API', data.Message);

                            if (data.Data[0].errors[0].message == "Token Expired") {
                                console.log('image API', data.Data[0].errors[0].message)
                                createNewAccessToken()

                            } else if (data.Data[0].message == "No records found") {

                                console.log('image API', data.Data[0].message)
                                imgLoading.classList.add('hide')
                                inspectionImgSection.style.display = "none"
                            }

                        } else {

                            populateImages(data.Response)

                        }

                    })
                    .catch(error => {
                        console.log('image API fetch catch', error)
                        imgLoading.classList.add('hide')
                        inspectionImgSection.style.display = "none"
                    })

            })
            .catch(error => {
                console.log('get access token fetch err', error);
                errorScreen.classList.remove('hide')
            })

    } catch (error) {
        console.log('image API try catch', error)
        imgLoading.classList.add('hide')
        inspectionImgSection.style.display = "none"
    }
}

function populateImages(arr) {
    let imagesArr = arr;
    let imgHtml = ``;

    // Create an array of promises for all watermarking processes
    const watermarkPromises = imagesArr.map(img => {
        return addWatermark(img.data).then(watermarkedImage => {
            return `
                <div class="grid-item">
                    <img src="data:image/jpeg;base64,${watermarkedImage}" alt="${img.Name}">
                    <div class="grid-text">${img.Name}</div>
                </div>
            `;
        }).catch(error => {
            console.error(error);
            return ''; // Return an empty string if there's an error
        });
    });

    // Wait for all watermark promises to resolve
    Promise.all(watermarkPromises).then(results => {
        
        imgHtml = results.join(''); // Combine all the HTML strings
        imageOut.innerHTML = imgHtml; // Update the DOM

        // Initialize the image gallery after the images are populated
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

        imgLoading.classList.add('hide')
    });

}

function addWatermark(base64Image) {
    return new Promise((resolve, reject) => {
        const watermark = new Image();
        watermark.src = './assets/ge watermark.png'; // Adjust the path to your PNG file
        watermark.onload = () => {
            const img = new Image();
            img.src = `data:image/png;base64,${base64Image}`;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const watermarkWidth = img.width / 3;
                const watermarkHeight = (watermark.height / watermark.width) * watermarkWidth;

                const xPos = (canvas.width - watermarkWidth) / 2;
                const yPos = (canvas.height - watermarkHeight) / 2;

                ctx.drawImage(watermark, xPos, yPos, watermarkWidth, watermarkHeight);

                const watermarkedBase64 = canvas.toDataURL('image/png').split(',')[1];
                resolve(watermarkedBase64);
            };
            img.onerror = (err) => {
                reject(err);
            };
        };
        watermark.onerror = (err) => {
            reject(err);
        };
    });
}


function scrollToElement() {
    document.getElementById('images').scrollIntoView({ behavior: 'smooth' });
}

// ? link generation, view link

function showGenLinkBtn(gbtnParam, vbtnParam) {

    if (gbtnParam == "show") {
        generateLinkBtn.classList.remove('hide')
    } else {
        generateLinkBtn.classList.add('hide')
    }

    if (vbtnParam == "show") {
        viewLinkBtn.classList.remove('hide')
    } else {
        viewLinkBtn.classList.add('hide')
    }
}

function checkBtnFlag() {
    if (btnFlag) {
        generateLinkBtn.classList.add('hide')
    } else {
        generateLinkBtn.classList.remove('hide')
    }
}

generateLinkBtn.addEventListener('click', () => {
    const currentUrl = new URL(window.location.href);
    const urlString = String(currentUrl)

    var urlParts = urlString.split('?');

    var baseUrl = urlParts[0];
    var params = urlParts[1].split('&');

    var updatedParams = params.filter(function (param) {
        var paramParts = param.split('=');
        return paramParts[0] !== "glbtn" && paramParts[0] !== "r" && paramParts[0] !== "vlbtn";
    });

    var updatedUrl = baseUrl + '?' + updatedParams.join('&');

    if (roleName != 'Service Advisor') {
        customerLink.innerHTML = updatedUrl
    }

    popUpModal.classList.remove('hide')
    
    updateurl(Tid, updatedUrl)

    btnFlag = true
    checkBtnFlag()

})

viewLinkBtn.addEventListener('click', () => {
    const currentUrl = new URL(window.location.href);
    const urlString = String(currentUrl)

    var urlParts = urlString.split('?');

    var baseUrl = urlParts[0];
    var params = urlParts[1].split('&');

    var updatedParams = params.filter(function (param) {
        var paramParts = param.split('=');
        return paramParts[0] !== "glbtn" && paramParts[0] !== "vlbtn" && paramParts[0] !== "r";
    });

    var updatedUrl = baseUrl + '?' + updatedParams.join('&');

    customerLink.innerHTML = updatedUrl
    popUpModal.classList.remove('hide')

})

modalCloseBtn.addEventListener('click', () => {
    popUpModal.classList.add('hide')
})

// ? copy link btn logic

// copyLinkBtn.addEventListener('click', async () => {

//     let range = document.createRange();
//     range.selectNode(customerLink);
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);
//     document.execCommand('copy');

//     window.getSelection().removeAllRanges();

//     copyLinkBtn.innerText = "Link Copied"
// })


function updateurl(tId, finalUrl) {

    // console.log("tId", tId);
    const body = JSON.stringify
        ({
            PrePurchaseInspectionURL: finalUrl
        });
    console.log("updated")

    try {
        fetch(`https://geapps.germanexperts.ae:7007/api/generalcrmapiupdatepreinspectioninspectionurl/${tId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': accessToken
            },
            body: body
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    } catch (error) {
        console.log(error)
    }



}

// For autoplay in android only.
function isAppleDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }

    if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
        return true;
    }

    return false;
}

if (isAppleDevice()) {
    mainVideo.removeAttribute('autoplay');
} else {
    mainVideo.setAttribute('autoplay', '');
}
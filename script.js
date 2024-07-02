document.addEventListener('DOMContentLoaded', function () {

    const loading = document.querySelector('.loading')

    const lastRefreshTime = document.querySelector('.last-refresh-time')
    const navSettings = document.querySelector('.nav-icon')
    const menu = document.querySelector('.controls')

    const allSpeedBtns = document.querySelectorAll('.s-btn')
    const lowSpeedBtn = document.querySelector('.l-s-btn')
    const midSpeedBtn = document.querySelector('.m-s-btn')
    const highSpeedBtn = document.querySelector('.h-s-btn')

    const listContainer = document.querySelector('.list-container')

    const copyrightYear = document.querySelector('.curr-year')

    let currentDate = new Date();
    let currYear = currentDate.getFullYear()
    copyrightYear.innerText = currYear

    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const timeString = hours + ':' + minutesStr + ' ' + ampm;

    // ? for auto scroll
    let isAutoScrollEnabled
    let currentHeight = 0;
    let bool = true;
    let step
    let speed = 5;
    let autoScrollInterval;
    let Height

    const carBrandImgMap = {
        astonMartin: {
            pathName: "AstonMartin",
            assetPath: "./assets/car/aston_martin.png"
        },
        audi: {
            pathName: "Audi",
            assetPath: "./assets/car/audi.png"
        },
        bentley: {
            pathName: "Bentley",
            assetPath: "./assets/car/bentley.png"
        },
        bmw: {
            pathName: "Bmw",
            assetPath: "./assets/car/bmw.png"
        },
        ferrari: {
            pathName: "Ferrari",
            assetPath: "./assets/car/ferrari.png"
        },
        fiat: {
            pathName: "Fiat",
            assetPath: "./assets/car/fiat.png"
        },
        jaguar: {
            pathName: "Jaguar",
            assetPath: "./assets/car/jaguar.png"
        },
        lamborghini: {
            pathName: "Lamborghini",
            assetPath: "./assets/car/lamborghini.png"
        },
        landRover: {
            pathName: "LandRover",
            assetPath: "./assets/car/land_rover.png"
        },
        lotus: {
            pathName: "Lotus",
            assetPath: "./assets/car/lotus.png"
        },
        maserati: {
            pathName: "Maserati",
            assetPath: "./assets/car/maserati.png"
        },
        maybach: {
            pathName: "Maybach",
            assetPath: "./assets/car/maybach.png"
        },
        mclaren: {
            pathName: "Mclaren",
            assetPath: "./assets/car/mclaren.png"
        },
        mercedesBenz: {
            pathName: "Mercedes-Benz",
            assetPath: "./assets/car/mercedes_benz.png"
        },
        mini: {
            pathName: "Mini",
            assetPath: "./assets/car/mini_cooper.png"
        },
        porsche: {
            pathName: "Porsche",
            assetPath: "./assets/car/porsche.png"
        },
        rangeRover: {
            pathName: "RangeRover",
            assetPath: "./assets/car/range_rover.png"
        },
        rollsRoyce: {
            pathName: "RollaRoyce",
            assetPath: "./assets/car/rolls_royce.png"
        },
        skoda: {
            pathName: "Skoda",
            assetPath: "./assets/car/skoda.png"
        },
        smart: {
            pathName: "Smart",
            assetPath: "./assets/car/smart.png"
        },
        volksWagon: {
            pathName: "VolksWagon",
            assetPath: "./assets/car/volkswagen.png"
        }
    }


    window.onload = () => {

        isScrollDataPresent()
        stater()
    }

    function isScrollDataPresent() {
        const existingautoScrollValue = localStorage.getItem('gebipasbtn');
        const existingautoScrollSpeedValue = localStorage.getItem('gebipasspd');

        if (existingautoScrollValue !== null && existingautoScrollSpeedValue !== null) {
            getScrollData()
        } else {
            localStorage.setItem('gebipasbtn', 'on');
            localStorage.setItem('gebipasspd', '0.2');
            getScrollData()
        }
    }

    function getScrollData() {
        isAutoScrollEnabled = localStorage.getItem('gebipasbtn')
        step = Number(localStorage.getItem('gebipasspd'))

        console.log(isAutoScrollEnabled, step);
    }

    function updateScrollBtnData(btn) {
        localStorage.setItem('gebipasbtn', btn);

        if (btn == "on") {
            document.getElementById('auto-scroll-checkbox').checked = true
        } else {
            document.getElementById('auto-scroll-checkbox').checked = false
        }
    }

    function updateScrollSpeedData(speed) {
        localStorage.setItem('gebipasspd', speed);

        allSpeedBtns.forEach(btn => btn.classList.remove('active'))

        if (speed == 0.1) {
            document.querySelector('.l-s-btn').classList.add('active')
        } else if (speed == 0.2) {
            document.querySelector('.m-s-btn').classList.add('active')
        } else if (speed == 0.3) {
            document.querySelector('.h-s-btn').classList.add('active')
        }
    }

    function stater() {

        try {

            fetch(`body-auh.json`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json()
                })
                .then(data => {

                    sequenceBasedOrder(data.recordsNew)
                    // ? update refresh time
                    lastRefreshTime.textContent = timeString;
                    loading.classList.add('hide')
                })
                .catch(error => console.log(error))

        } catch (error) {
            console.log(error)
        }
    }



    function sequenceBasedOrder(data) {

        data.sort((a, b) => {
            return parseInt(a.sequence) - parseInt(b.sequence);
        });

        let seenValues = new Set();
        let htmlTemplate = '';

        data.forEach(item => {
            const className = item.requeststageNew.toLowerCase().split(" ").join("-");
            if (!seenValues.has(item.requeststageNew)) {
                htmlTemplate += `
                <div class="d-row">
                    <div class="row-head">
                        <div class="no-of-cards">
                            <p class="no-of-mercedes-out ${className + "-no-of-mercedes"}"></p>
                            <p class="no-of-vw-out ${className + "-no-of-vw"}"></p>
                            <p class="no-of-bmw-rr-out ${className + "-no-of-bmw-rr"}"></p>
                            <p class="no-of-general-out ${className + "-no-of-general"}"></p>
                            <p>|</p>
                            <p class="no-of-card-out ${className + "-no-of-card"}"></p>
                        </div>
                        <img src="./assets/gifs/${className}.gif" onerror="this.src='./assets/Empty.png'" alt="">
                        <p>${item.requeststageNew}</p>
                    </div>
                    <div class="row-body">
                        <div class="cards-wrapper ${className}">


                        </div>
                    </div>
                </div>
            `;

                seenValues.add(item.requeststageNew);
            }
        });

        listContainer.innerHTML = htmlTemplate

        populateData(data)

    }




    // ? menu
    navSettings.addEventListener('click', () => {
        menu.classList.toggle('drop-down')
    })

    // ? populate brand images in card
    function pathToImage(filePath) {
        const parts = filePath.split("/");
        const fileNameWithExt = parts.pop()
        const fileName = fileNameWithExt.split(".")[0]

        for (let car in carBrandImgMap) {
            if (carBrandImgMap[car].pathName == fileName) {

                return carBrandImgMap[car].assetPath
            }
        }
        // console.error(`No asset path found for file name '${fileName}'`);
    }

    function populateData(data) {

        const rowBody = document.querySelector('.row-body')

        const groupObj = {
            mercedes: {
                groupName: "MERCEDES TEAM",
                outVal: "Mercedes",
                classAlias: "a"
            },
            vw: {
                groupName: "VW GROUP",
                outVal: "VW",
                classAlias: "b"
            },
            bmwRolls: {
                groupName: "BMW || RANGE ROVER TEAM",
                outVal: "BMW/RR",
                classAlias: "c"
            },
            general: {
                groupName: "GENERAL",
                outVal: "General",
                classAlias: "d"
            }
        }

        function groupClassAssigner(groupname) {
            for (let group in groupObj) {
                if (groupname == groupObj[group].groupName) {
                    return groupObj[group].classAlias
                }
            }
        }

        const mapObj = {
            section1: {
                requeststageName: "Parts On Order",
                outputDiv: document.querySelector('.parts-on-order'),
                noOfCardOutDiv: document.querySelector('.parts-on-order-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.parts-on-order-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.parts-on-order-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.parts-on-order-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.parts-on-order-no-of-general'),
                noOfGeneralGroup: 0
            },
            section2: {
                requeststageName: "Job Request Created",
                outputDiv: document.querySelector('.job-request-created'),
                noOfCardOutDiv: document.querySelector('.job-request-created-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-request-created-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-request-created-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-request-created-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-request-created-no-of-general'),
                noOfGeneralGroup: 0
            },
            section3: {
                requeststageName: "Job Inprogress",
                outputDiv: document.querySelector('.job-inprogress'),
                noOfCardOutDiv: document.querySelector('.job-inprogress-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-inprogress-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-inprogress-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-inprogress-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-inprogress-no-of-general'),
                noOfGeneralGroup: 0
            },
            section4: {
                requeststageName: "Job Approved",
                outputDiv: document.querySelector('.job-approved'),
                noOfCardOutDiv: document.querySelector('.job-approved-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-approved-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-approved-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-approved-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-approved-no-of-general'),
                noOfGeneralGroup: 0
            },
            section5: {
                requeststageName: "Assigned Team Leader",
                outputDiv: document.querySelector('.assigned-team-leader'),
                noOfCardOutDiv: document.querySelector('.assigned-team-leader-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-team-leader-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-team-leader-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-team-leader-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-team-leader-no-of-general'),
                noOfGeneralGroup: 0
            },
            section6: {
                requeststageName: "Assigned Quality Controller",
                outputDiv: document.querySelector('.assigned-quality-controller'),
                noOfCardOutDiv: document.querySelector('.assigned-quality-controller-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-quality-controller-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-quality-controller-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-quality-controller-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-quality-controller-no-of-general'),
                noOfGeneralGroup: 0
            },
            section7: {
                requeststageName: "Assigned Service Advisor",
                outputDiv: document.querySelector('.assigned-service-advisor'),
                noOfCardOutDiv: document.querySelector('.assigned-service-advisor-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-service-advisor-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-service-advisor-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-service-advisor-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-service-advisor-no-of-general'),
                noOfGeneralGroup: 0
            },
            section8: {
                requeststageName: "Job Estimation Approval Request",
                outputDiv: document.querySelector('.job-estimation-approval-request'),
                noOfCardOutDiv: document.querySelector('.job-estimation-approval-request-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-estimation-approval-request-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-estimation-approval-request-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-estimation-approval-request-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-estimation-approval-request-no-of-general'),
                noOfGeneralGroup: 0
            },
            section9: {
                requeststageName: "Assigned Partadvisor For Estimation",
                outputDiv: document.querySelector('.assigned-partadvisor-for-estimation'),
                noOfCardOutDiv: document.querySelector('.assigned-partadvisor-for-estimation-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-partadvisor-for-estimation-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-partadvisor-for-estimation-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-partadvisor-for-estimation-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-partadvisor-for-estimation-no-of-general'),
                noOfGeneralGroup: 0
            },
            section10: {
                requeststageName: "Job Completed and Invoiced",
                outputDiv: document.querySelector('.job-completed-and-invoiced'),
                noOfCardOutDiv: document.querySelector('.job-completed-and-invoiced-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-completed-and-invoiced-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-completed-and-invoiced-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-completed-and-invoiced-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-completed-and-invoiced-no-of-general'),
                noOfGeneralGroup: 0
            },
            section11: {
                requeststageName: "Job Estimation Request Approved",
                outputDiv: document.querySelector('.job-estimation-request-approved'),
                noOfCardOutDiv: document.querySelector('.job-estimation-request-approved-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-estimation-request-approved-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-estimation-request-approved-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-estimation-request-approved-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-estimation-request-approved-no-of-general'),
                noOfGeneralGroup: 0
            },
            section12: {
                requeststageName: "Job Completed Assigned Accounts Department",
                outputDiv: document.querySelector('.job-completed-assigned-accounts-department'),
                noOfCardOutDiv: document.querySelector('.job-completed-assigned-accounts-department-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-completed-assigned-accounts-department-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-completed-assigned-accounts-department-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-completed-assigned-accounts-department-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-completed-assigned-accounts-department-no-of-general'),
                noOfGeneralGroup: 0
            },
            section13: {
                requeststageName: "Job Estimation Request Rejected",
                outputDiv: document.querySelector('.job-estimation-request-rejected'),
                noOfCardOutDiv: document.querySelector('.job-estimation-request-rejected-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-estimation-request-rejected-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-estimation-request-rejected-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-estimation-request-rejected-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-estimation-request-rejected-no-of-general'),
                noOfGeneralGroup: 0
            },
            section14: {
                requeststageName: "Quality Checked With Note And Assigned to Service Advisor",
                outputDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor'),
                noOfCardOutDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.quality-checked-with-note-and-assigned-to-service-advisor-no-of-general'),
                noOfGeneralGroup: 0
            },
            section15: {
                requeststageName: "Car Wash",
                outputDiv: document.querySelector('.car-wash'),
                noOfCardOutDiv: document.querySelector('.car-wash-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.car-wash-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.car-wash-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.car-wash-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.car-wash-no-of-general'),
                noOfGeneralGroup: 0
            },
            section16: {
                requeststageName: "Ready For Delivery",
                outputDiv: document.querySelector('.ready-for-delivery'),
                noOfCardOutDiv: document.querySelector('.ready-for-delivery-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.ready-for-delivery-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.ready-for-delivery-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.ready-for-delivery-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.ready-for-delivery-no-of-general'),
                noOfGeneralGroup: 0
            },
            section17: {
                requeststageName: "Quality Check In Progress",
                outputDiv: document.querySelector('.quality-check-in-progress'),
                noOfCardOutDiv: document.querySelector('.quality-check-in-progress-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.quality-check-in-progress-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.quality-check-in-progress-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.quality-check-in-progress-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.quality-check-in-progress-no-of-general'),
                noOfGeneralGroup: 0
            },
            section18: {
                requeststageName: "Car Wash Completed",
                outputDiv: document.querySelector('.car-wash-completed'),
                noOfCardOutDiv: document.querySelector('.car-wash-completed-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.car-wash-completed-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.car-wash-completed-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.car-wash-completed-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.car-wash-completed-no-of-general'),
                noOfGeneralGroup: 0
            },
            section19: {
                requeststageName: "Job Delivered Parts On Order",
                outputDiv: document.querySelector('.job-delivered-parts-on-order'),
                noOfCardOutDiv: document.querySelector('.job-delivered-parts-on-order-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-delivered-parts-on-order-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-delivered-parts-on-order-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-delivered-parts-on-order-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-delivered-parts-on-order-no-of-general'),
                noOfGeneralGroup: 0
            },
            section20: {
                requeststageName: "Inspection In Progress",
                outputDiv: document.querySelector('.inspection-in-progress'),
                noOfCardOutDiv: document.querySelector('.inspection-in-progress-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.inspection-in-progress-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.inspection-in-progress-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.inspection-in-progress-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.inspection-in-progress-no-of-general'),
                noOfGeneralGroup: 0
            },
            section21: {
                requeststageName: "Parts Estimate In Progress",
                outputDiv: document.querySelector('.parts-estimate-in-progress'),
                noOfCardOutDiv: document.querySelector('.parts-estimate-in-progress-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.parts-estimate-in-progress-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.parts-estimate-in-progress-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.parts-estimate-in-progress-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.parts-estimate-in-progress-no-of-general'),
                noOfGeneralGroup: 0
            },
            section22: {
                requeststageName: "Assigned Bodyshop Estimator",
                outputDiv: document.querySelector('.assigned-bodyshop-estimator'),
                noOfCardOutDiv: document.querySelector('.assigned-bodyshop-estimator-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-bodyshop-estimator-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-bodyshop-estimator-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-bodyshop-estimator-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-bodyshop-estimator-no-of-general'),
                noOfGeneralGroup: 0
            },
            section23: {
                requeststageName: "Parts Estimated Assigned Service Advisor",
                outputDiv: document.querySelector('.parts-estimated-assigned-service-advisor'),
                noOfCardOutDiv: document.querySelector('.parts-estimated-assigned-service-advisor-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.parts-estimated-assigned-service-advisor-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.parts-estimated-assigned-service-advisor-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.parts-estimated-assigned-service-advisor-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.parts-estimated-assigned-service-advisor-no-of-general'),
                noOfGeneralGroup: 0
            },
            section24: {
                requeststageName: "Assigned Engine Department",
                outputDiv: document.querySelector('.assigned-engine-department'),
                noOfCardOutDiv: document.querySelector('.assigned-engine-department-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-engine-department-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-engine-department-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-engine-department-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-engine-department-no-of-general'),
                noOfGeneralGroup: 0
            },
            section25: {
                requeststageName: "Assigned Technical Department",
                outputDiv: document.querySelector('.assigned-technical-department'),
                noOfCardOutDiv: document.querySelector('.assigned-technical-department-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-technical-department-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-technical-department-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-technical-department-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-technical-department-no-of-general'),
                noOfGeneralGroup: 0
            },
            section26: {
                requeststageName: "Assigned Denter",
                outputDiv: document.querySelector('.assigned-denter'),
                noOfCardOutDiv: document.querySelector('.assigned-denter-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-denter-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-denter-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-denter-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-denter-no-of-general'),
                noOfGeneralGroup: 0
            },
            section27: {
                requeststageName: "Assigned Painter",
                outputDiv: document.querySelector('.assigned-painter'),
                noOfCardOutDiv: document.querySelector('.assigned-painter-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-painter-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-painter-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-painter-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-painter-no-of-general'),
                noOfGeneralGroup: 0
            },
            section28: {
                requeststageName: "Assigned Polisher",
                outputDiv: document.querySelector('.assigned-polisher'),
                noOfCardOutDiv: document.querySelector('.assigned-polisher-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-polisher-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-polisher-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-polisher-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-polisher-no-of-general'),
                noOfGeneralGroup: 0
            },
            section29: {
                requeststageName: "Waiting For Parts Price",
                outputDiv: document.querySelector('.waiting-for-parts-price'),
                noOfCardOutDiv: document.querySelector('.waiting-for-parts-price-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.waiting-for-parts-price-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.waiting-for-parts-price-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.waiting-for-parts-price-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.waiting-for-parts-price-no-of-general'),
                noOfGeneralGroup: 0
            },
            section30: {
                requeststageName: "Assigned Upholsterer",
                outputDiv: document.querySelector('.assigned-upholsterer'),
                noOfCardOutDiv: document.querySelector('.assigned-upholsterer-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-upholsterer-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-upholsterer-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-upholsterer-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-upholsterer-no-of-general'),
                noOfGeneralGroup: 0
            },
            section31: {
                requeststageName: "Assigned QC For Observation",
                outputDiv: document.querySelector('.assigned-qc-for-observation'),
                noOfCardOutDiv: document.querySelector('.assigned-qc-for-observation-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-qc-for-observation-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-qc-for-observation-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-qc-for-observation-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-qc-for-observation-no-of-general'),
                noOfGeneralGroup: 0
            },
            section32: {
                requeststageName: "Parts Estimated Assigned Claim Department",
                outputDiv: document.querySelector('.parts-estimated-assigned-claim-department'),
                noOfCardOutDiv: document.querySelector('.parts-estimated-assigned-claim-department-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.parts-estimated-assigned-claim-department-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.parts-estimated-assigned-claim-department-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.parts-estimated-assigned-claim-department-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.parts-estimated-assigned-claim-department-no-of-general'),
                noOfGeneralGroup: 0
            },
            section33: {
                requeststageName: "Job Estimation In Progress",
                outputDiv: document.querySelector('.job-estimation-in-progress'),
                noOfCardOutDiv: document.querySelector('.job-estimation-in-progress-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-estimation-in-progress-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-estimation-in-progress-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-estimation-in-progress-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-estimation-in-progress-no-of-general'),
                noOfGeneralGroup: 0
            },
            section34: {
                requeststageName: "Job Estimation",
                outputDiv: document.querySelector('.job-estimation'),
                noOfCardOutDiv: document.querySelector('.job-estimation-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-estimation-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-estimation-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-estimation-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-estimation-no-of-general'),
                noOfGeneralGroup: 0
            },
            section35: {
                requeststageName: "Waiting For Insurance Survey",
                outputDiv: document.querySelector('.waiting-for-insurance-survey'),
                noOfCardOutDiv: document.querySelector('.waiting-for-insurance-survey-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.waiting-for-insurance-survey-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.waiting-for-insurance-survey-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.waiting-for-insurance-survey-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.waiting-for-insurance-survey-no-of-general'),
                noOfGeneralGroup: 0
            },
            section36: {
                requeststageName: "Waiting For Insurance Approval",
                outputDiv: document.querySelector('.waiting-for-insurance-approval'),
                noOfCardOutDiv: document.querySelector('.waiting-for-insurance-approval-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.waiting-for-insurance-approval-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.waiting-for-insurance-approval-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.waiting-for-insurance-approval-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.waiting-for-insurance-approval-no-of-general'),
                noOfGeneralGroup: 0
            },
            section37: {
                requeststageName: "Assigned Partadvisor For Ordering",
                outputDiv: document.querySelector('.assigned-partadvisor-for-ordering'),
                noOfCardOutDiv: document.querySelector('.assigned-partadvisor-for-ordering-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-partadvisor-for-ordering-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-partadvisor-for-ordering-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-partadvisor-for-ordering-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-partadvisor-for-ordering-no-of-general'),
                noOfGeneralGroup: 0
            },
            section38: {
                requeststageName: "Job Completed Waiting Lpo",
                outputDiv: document.querySelector('.job-completed-waiting-lpo'),
                noOfCardOutDiv: document.querySelector('.job-completed-waiting-lpo-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-completed-waiting-lpo-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-completed-waiting-lpo-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-completed-waiting-lpo-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-completed-waiting-lpo-no-of-general'),
                noOfGeneralGroup: 0
            },
            section39: {
                requeststageName: "Job Delivered Waiting For Lpo",
                outputDiv: document.querySelector('.job-delivered-waiting-for-lpo'),
                noOfCardOutDiv: document.querySelector('.job-delivered-waiting-for-lpo-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-delivered-waiting-for-lpo-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-delivered-waiting-for-lpo-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-delivered-waiting-for-lpo-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-delivered-waiting-for-lpo-no-of-general'),
                noOfGeneralGroup: 0
            },
            section40: {
                requeststageName: "Job Completed And Invoiced Waiting For Lpo",
                outputDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo'),
                noOfCardOutDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.job-completed-and-invoiced-waiting-for-lpo-no-of-general'),
                noOfGeneralGroup: 0
            },
            section41: {
                requeststageName: "Assigned Partadvisor For Bodyshop Estimation",
                outputDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation'),
                noOfCardOutDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-partadvisor-for-bodyshop-estimation-no-of-general'),
                noOfGeneralGroup: 0
            },
            section42: {
                requeststageName: "Pending Estimation",
                outputDiv: document.querySelector('.pending-estimation'),
                noOfCardOutDiv: document.querySelector('.pending-estimation-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.pending-estimation-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.pending-estimation-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.pending-estimation-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.pending-estimation-no-of-general'),
                noOfGeneralGroup: 0
            },
            section43: {
                requeststageName: "Assigned Partadvisor For Availability",
                outputDiv: document.querySelector('.assigned-partadvisor-for-availability'),
                noOfCardOutDiv: document.querySelector('.assigned-partadvisor-for-availability-no-of-card'),
                noOfCards: 0,
                noOfMercedesOutDiv: document.querySelector('.assigned-partadvisor-for-availability-no-of-mercedes'),
                noOfMercedesGroup: 0,
                noOfBmwRROutDiv: document.querySelector('.assigned-partadvisor-for-availability-no-of-bmw-rr'),
                noOfBmwRRGroup: 0,
                noOfVWOutDiv: document.querySelector('.assigned-partadvisor-for-availability-no-of-vw'),
                noOfVWGroup: 0,
                noOfGeneralOutDiv: document.querySelector('.assigned-partadvisor-for-availability-no-of-general'),
                noOfGeneralGroup: 0
            },
        }


        for (let section in data) {

            for (let mapName in mapObj) {

                if (data[section].requeststageNew == mapObj[mapName].requeststageName) {

                    let Outdiv = mapObj[mapName].outputDiv

                    mapObj[mapName].noOfCards++

                    if (data[section].groupname == "MERCEDES TEAM") {
                        mapObj[mapName].noOfMercedesGroup++
                    } else if (data[section].groupname == "VW GROUP") {
                        mapObj[mapName].noOfVWGroup++
                    } else if (data[section].groupname == "BMW || RANGE ROVER TEAM") {
                        mapObj[mapName].noOfBmwRRGroup++
                    } else if (data[section].groupname == "GENERAL") {
                        mapObj[mapName].noOfGeneralGroup++
                    }

                    Outdiv.innerHTML += `
                        <div class="${groupClassAssigner(data[section].groupname)} card">
                            <img class="bg-ele" src="./assets/bg-pattern.png" />
                            <div class="card-header">
                                <p class="plate-no">${data[section].plateNoNew}</p>
                                <div class="car-logo">
                                    <img class="car-logo" src=${pathToImage(data[section].vehicleBrandNew)} onerror="this.src='./assets/Empty.png'" >
                                </div>
                            </div>
                            <div class="time-lapsed-container">
                                <img class="clock-icon" src="./assets/time-black.png" alt="">
                                <p class="time-lapsed">${data[section].jobcreateddatetimeNew}</p>
                            </div>
                        </div>
                    `

                    if (mapObj[mapName].noOfCardOutDiv) {
                        mapObj[mapName].noOfCardOutDiv.innerText = mapObj[mapName].noOfCards
                    }

                    if (mapObj[mapName].noOfMercedesOutDiv) {
                        mapObj[mapName].noOfMercedesOutDiv.innerText = mapObj[mapName].noOfMercedesGroup
                    }
                    if (mapObj[mapName].noOfBmwRROutDiv) {
                        mapObj[mapName].noOfBmwRROutDiv.innerText = mapObj[mapName].noOfBmwRRGroup
                    }
                    if (mapObj[mapName].noOfVWOutDiv) {
                        mapObj[mapName].noOfVWOutDiv.innerText = mapObj[mapName].noOfVWGroup
                    }
                    if (mapObj[mapName].noOfGeneralOutDiv) {
                        mapObj[mapName].noOfGeneralOutDiv.innerText = mapObj[mapName].noOfGeneralGroup
                    }



                    if (Outdiv.children.length * 200 > rowBody.offsetWidth) {
                        mapObj[mapName].outputDiv.classList.add('animate')
                        createKeyframeAnimation(Outdiv.children.length * 200, Outdiv.children.length, mapName)
                    }

                    function createKeyframeAnimation(totalWidth, NoOfCards, sectionName) {

                        //     const keyframes = `
                        //     @keyframes ${sectionName + "Scroll"} {
                        //         0% {
                        //             left: 0;
                        //         }
                        //         50% {
                        //             left: calc(100% - ${totalWidth + (NoOfCards * 10)}px);
                        //         }
                        //         100% {
                        //             left: 0;
                        //         }
                        //     }
                        // `;

                        const keyframes = `
                            @keyframes ${sectionName + "Scroll"} {
                                0% {
                                    transform: translateX(50px);
                                }
                                50% {
                                    transform: translateX(calc(100% - ${totalWidth + (NoOfCards * 10)}px));
                                }
                                100% {
                                    transform: translateX(50px);
                                }
                            }
                        `;

                        const styleSheet = document.createElement("style");
                        styleSheet.type = "text/css";
                        styleSheet.innerText = keyframes;

                        document.head.appendChild(styleSheet);

                        applyAnimation(sectionName, NoOfCards)
                    }

                    function applyAnimation(sectionName, NoOfCards) {
                        mapObj[sectionName].outputDiv.style.animation = `${sectionName + "Scroll"} ${NoOfCards * 15}s linear infinite`;
                    }

                    // ? pause horizontal scroll on hover
                    const allCardWrapper = document.querySelectorAll('.cards-wrapper')

                    allCardWrapper.forEach(wrapper => {
                        wrapper.addEventListener('mouseover', function () {
                            this.style.webkitAnimationPlayState = 'paused';
                            this.style.mozAnimationPlayState = 'paused';
                            this.style.oAnimationPlayState = 'paused';
                            this.style.animationPlayState = 'paused';
                        });

                        wrapper.addEventListener('mouseout', function () {
                            this.style.webkitAnimationPlayState = '';
                            this.style.mozAnimationPlayState = '';
                            this.style.oAnimationPlayState = '';
                            this.style.animationPlayState = '';
                        });
                    })

                }
            }
        }

        for (let mapName in mapObj) {
            sortDivsByClass(mapObj[mapName].outputDiv)

            if (mapObj[mapName].noOfMercedesOutDiv && mapObj[mapName].noOfMercedesOutDiv.innerText == 0) {
                mapObj[mapName].noOfMercedesOutDiv.style.display = 'none'
            }
            if (mapObj[mapName].noOfBmwRROutDiv && mapObj[mapName].noOfBmwRROutDiv.innerText == 0) {
                mapObj[mapName].noOfBmwRROutDiv.style.display = 'none'
            }
            if (mapObj[mapName].noOfVWOutDiv && mapObj[mapName].noOfVWOutDiv.innerText == 0) {
                mapObj[mapName].noOfVWOutDiv.style.display = 'none'
            }
            if (mapObj[mapName].noOfGeneralOutDiv && mapObj[mapName].noOfGeneralOutDiv.innerText == 0) {
                mapObj[mapName].noOfGeneralOutDiv.style.display = 'none'
            }
        }

        function sortDivsByClass(parentClass) {
            if (parentClass != null) {
                const parent = parentClass;
                const divsArray = Array.from(parent.children);
                divsArray.sort((a, b) => a.className.localeCompare(b.className));

                parent.innerHTML = '';
                divsArray.forEach(div => parent.appendChild(div));
            }
        }


        // ? auto scroll
        Height = document.documentElement.scrollHeight - window.innerHeight

        if (isAutoScrollEnabled == "on") {
            setTimeout(() => {
                startAutoScroll()
            }, 500);
            document.getElementById('auto-scroll-checkbox').checked = true
        } else {
            document.getElementById('auto-scroll-checkbox').checked = false
        }

        allSpeedBtns.forEach(btn => btn.classList.remove('active'))

        if (step == 0.1) {
            document.querySelector('.l-s-btn').classList.add('active')
        } else if (step == 0.2) {
            document.querySelector('.m-s-btn').classList.add('active')
        } else if (step == 0.3) {
            document.querySelector('.h-s-btn').classList.add('active')
        }
    }

    // ? auto scroll

    function pageScroll() {
        if (currentHeight < 0 || currentHeight > Height) {
            bool = !bool;
        }
        if (bool) {
            window.scrollTo(0, currentHeight += step);
        } else {

            window.scrollTo(0, currentHeight -= step);
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(pageScroll, speed);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    document.getElementById('auto-scroll-checkbox').addEventListener('change', function () {
        if (this.checked) {
            updateScrollBtnData('on')
            startAutoScroll()
        } else {
            updateScrollBtnData('off')
            stopAutoScroll()
        }
    });

    // ? scroll speed btns
    lowSpeedBtn.addEventListener('click', () => {
        step = 0.1;
        updateScrollSpeedData('0.1');
    })

    midSpeedBtn.addEventListener('click', () => {
        step = 0.2;
        updateScrollSpeedData('0.2');
    })

    highSpeedBtn.addEventListener('click', () => {
        step = 0.3;
        updateScrollSpeedData('0.3');
    })

});

const allCardWrapper = document.querySelectorAll('.cards-wrapper')

const section1Out = document.querySelector('.section-1')
const section2Out = document.querySelector('.section-2')
const section3Out = document.querySelector('.section-3')
const section4Out = document.querySelector('.section-4')
const section5Out = document.querySelector('.section-5')
const section6Out = document.querySelector('.section-6')
const section7Out = document.querySelector('.section-7')
const section8Out = document.querySelector('.section-8')
const section9Out = document.querySelector('.section-9')
const section10Out = document.querySelector('.section-10')
const section11Out = document.querySelector('.section-11')
const section12Out = document.querySelector('.section-12')
const section13Out = document.querySelector('.section-13')
const section14Out = document.querySelector('.section-14')
const section15Out = document.querySelector('.section-15')
const section16Out = document.querySelector('.section-16')
const section17Out = document.querySelector('.section-17')
const section18Out = document.querySelector('.section-18')
const section19Out = document.querySelector('.section-19')
const section20Out = document.querySelector('.section-20')
const section21Out = document.querySelector('.section-21')
const section22Out = document.querySelector('.section-22')
const section23Out = document.querySelector('.section-23')
const section24Out = document.querySelector('.section-24')
const section25Out = document.querySelector('.section-25')
const section26Out = document.querySelector('.section-26')
const section27Out = document.querySelector('.section-27')
const section28Out = document.querySelector('.section-28')
const section29Out = document.querySelector('.section-29')
const section30Out = document.querySelector('.section-30')
const section31Out = document.querySelector('.section-31')
const section32Out = document.querySelector('.section-32')
const section33Out = document.querySelector('.section-33')
const section34Out = document.querySelector('.section-34')
const section35Out = document.querySelector('.section-35')
const section36Out = document.querySelector('.section-36')
const section37Out = document.querySelector('.section-37')
const section38Out = document.querySelector('.section-38')
const section39Out = document.querySelector('.section-39')
const section40Out = document.querySelector('.section-40')
const section41Out = document.querySelector('.section-41')
const section42Out = document.querySelector('.section-42')


const rowBody = document.querySelector('.row-body')


const mapObj = {
    section1: {
        requeststageName: "Parts On Order",
        outputDiv: section1Out
    },
    section2: {
        requeststageName: "Generate Job Estimation",
        outputDiv: section2Out
    },
    section3: {
        requeststageName: "Job In progress",
        outputDiv: section3Out
    },
    section4: {
        requeststageName: "Job Approved",
        outputDiv: section4Out
    },
    section5: {
        requeststageName: "Assigned Team Leader",
        outputDiv: section5Out
    },
    section6: {
        requeststageName: "Assigned Quality Controller",
        outputDiv: section6Out
    },
    section7: {
        requeststageName: "Assigned Service Advisor",
        outputDiv: section7Out
    },
    section8: {
        requeststageName: "Job Estimation Approval Request",
        outputDiv: section8Out
    },
    section9: {
        requeststageName: "Assigned Part Advisor For Estimation",
        outputDiv: section9Out
    },
    section10: {
        requeststageName: "Job Completed and Invoiced",
        outputDiv: section10Out
    },
    section11: {
        requeststageName: "Job Estimation Request Approved",
        outputDiv: section11Out
    },
    section12: {
        requeststageName: "Job Completed Assigned Accounts Department",
        outputDiv: section12Out
    },
    section13: {
        requeststageName: "Job Estimation Request Rejected",
        outputDiv: section13Out
    },
    section14: {
        requeststageName: "Quality Checked With Note And Assigned to Service Advisor",
        outputDiv: section14Out
    },
    section15: {
        requeststageName: "Car Wash",
        outputDiv: section15Out
    },
    section16: {
        requeststageName: "Ready For Delivery",
        outputDiv: section16Out
    },
    section17: {
        requeststageName: "QC In Progress",
        outputDiv: section17Out
    },
    section18: {
        requeststageName: "Job Cancellation Approval Request",
        outputDiv: section18Out
    },
    section19: {
        requeststageName: "Job Delivered Parts On Order",
        outputDiv: section19Out
    },
    section20: {
        requeststageName: "Inspection In Progress",
        outputDiv: section20Out
    },
    section21: {
        requeststageName: "Parts Estimate In Progress",
        outputDiv: section21Out
    },
    section22: {
        requeststageName: "Assigned Bodyshop Estimator",
        outputDiv: section22Out
    },
    section23: {
        requeststageName: "Parts Estimated Assigned Service Advisor",
        outputDiv: section23Out
    },
    section24: {
        requeststageName: "Assigned Engine Department",
        outputDiv: section24Out
    },
    section25: {
        requeststageName: "Assigned Technical Department",
        outputDiv: section25Out
    },
    section26: {
        requeststageName: "Assigned Denter",
        outputDiv: section26Out
    },
    section27: {
        requeststageName: "Assigned Painter",
        outputDiv: section27Out
    },
    section28: {
        requeststageName: "Assigned Polisher",
        outputDiv: section28Out
    },
    section29: {
        requeststageName: "Waiting For Parts Price",
        outputDiv: section29Out
    },
    section30: {
        requeststageName: "Assigned Upholsterer",
        outputDiv: section30Out
    },
    section31: {
        requeststageName: "Assigned QC For Observation",
        outputDiv: section31Out
    },
    section32: {
        requeststageName: "Parts Estimated Assigned Claim Department",
        outputDiv: section32Out
    },
    section33: {
        requeststageName: "Job Estimation In Progress",
        outputDiv: section33Out
    },
    section34: {
        requeststageName: "Job Estimation",
        outputDiv: section34Out
    },
    section35: {
        requeststageName: "Waiting For Insurance Survey",
        outputDiv: section35Out
    },
    section36: {
        requeststageName: "Waiting For Insurance Approval",
        outputDiv: section36Out
    },
    section37: {
        requeststageName: "Assigned Partadvisor For Ordering",
        outputDiv: section37Out
    },
    section38: {
        requeststageName: "Job Completed Waiting Lpo",
        outputDiv: section38Out
    },
    section39: {
        requeststageName: "Job Delivered Waiting For Lpo",
        outputDiv: section39Out
    },
    section40: {
        requeststageName: "Job Completed And Invoiced Waiting For Lpo",
        outputDiv: section40Out
    },
    section41: {
        requeststageName: "Assigned Partadvisor For Bodyshop Estimation",
        outputDiv: section41Out
    },
    section42: {
        requeststageName: "Pending Estimation",
        outputDiv: section42Out
    }
}


try {
    fetch(`data.json`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.recordsNew);
            populateData(data.recordsNew)
        })
        .catch(error => console.log(error))
} catch (error) {
    console.log(error)
}



function populateData(data) {
    for (let section in data) {

        for (let mapName in mapObj) {

            if (data[section].requeststageNew == mapObj[mapName].requeststageName) {

                let Outdiv = mapObj[mapName].outputDiv

                Outdiv.innerHTML += `
                    <div class="card">
                        <img class="bg-ele" src="./assets/bg-pattern.png" />
                        <div class="card-header">
                            <p class="plate-no">${data[section].plateNoNew}</p>
                            <div class="car-logo">
                                <img class="car-logo" src="./assets/car/aston_martin.png">
                            </div>
                        </div>
                        <div class="time-lapsed-container">
                            <img class="clock-icon" src="./assets/time-black.png" alt="">
                            <p class="time-lapsed">${data[section].jobcreateddatetimeNew}</p>
                        </div>
                    </div>
                `

                if (Outdiv.children.length * 230 > rowBody.offsetWidth) {
                    mapObj[mapName].outputDiv.classList.add('animate')
                    createKeyframeAnimation(Outdiv.children.length * 230, Outdiv.children.length, mapName)
                }

            }
        }
    }
}



function createKeyframeAnimation(totalWidth, NoOfCards, sectionName) {

    const keyframes = `
        @keyframes ${sectionName + "Scroll"} {
            0% {
                left: 0;
            }
            50% {
                left: calc(100% - ${totalWidth + (NoOfCards * 10)}px);
            }
            100% {
                left: 0;
            }
        }
    `;

    // Create a <style> element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;

    // Append the <style> element to the <head> of the document
    document.head.appendChild(styleSheet);

    applyAnimation(sectionName, NoOfCards)
}


function applyAnimation(sectionName, NoOfCards) {
    mapObj[sectionName].outputDiv.style.animation = `${sectionName + "Scroll"} ${NoOfCards * 2}s ease-in-out infinite`;
}



// ? vertical scroll

let direction = 'down'; // Initial direction
let scrollAmount = 3;
let scrollInterval = 20; // Interval between scrolls in milliseconds
let autoScrollInterval;

function autoScroll() {
    let currentPosition = window.scrollY;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    if (direction === 'down') {
        if (currentPosition + windowHeight + scrollAmount < documentHeight) {
            window.scrollBy(0, scrollAmount);
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (currentPosition - scrollAmount > 0) {
            window.scrollBy(0, -scrollAmount);
        } else {
            direction = 'down';
        }
    }
}

function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, scrollInterval);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

document.getElementById('auto-scroll-checkbox').addEventListener('change', function () {
    if (this.checked) {
        startAutoScroll();
    } else {
        stopAutoScroll();
    }
});

document.getElementById('scroll-speed').addEventListener('input', function () {
    scrollAmount = parseInt(this.value);
});

startAutoScroll()

// ? pause horizontal scroll on hover
allCardWrapper.forEach(wrapper => {
    wrapper.addEventListener('mouseover', function () {
        this.style.webkitAnimationPlayState = 'paused';
        this.style.mozAnimationPlayState = 'paused';
        this.style.oAnimationPlayState = 'paused';
        this.style.animationPlayState = 'paused';
    });

    // Remove inline styles when mouse leaves
    wrapper.addEventListener('mouseout', function () {
        this.style.webkitAnimationPlayState = '';
        this.style.mozAnimationPlayState = '';
        this.style.oAnimationPlayState = '';
        this.style.animationPlayState = '';
    });
})

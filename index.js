// Get All Flowers Components  
const flower = document.getElementById('flower');
const flowerHead = document.getElementById('flowerHead'); 

// Get Status Panel 
const statusPanel = document.getElementById('statusPanel'); 

// Get All Buttons 
const waterBtn = document.getElementById('waterBtn');
const sunBtn = document.getElementById('sunBtn');
const fertilizerBtn = document.getElementById('fertilizerBtn'); 
const talkBtn = document.getElementById('talkBtn');

// Get Activty History Wrapper
const activityHistory = document.getElementById('activityHistory'); 

// Create Empty Massage Function 
const checkEmptyMassage = () => {
    const emptyMassage = document.querySelector('.empty-massage'); 
    if(activityHistory.children.length === 0 ) {
        if(!emptyMassage) {
            const p = document.createElement('p');
            p.className = `empty-massage text-xl font-light text-green-500 my-10 text-center`;
            p.textContent = `No Activity Yet`; 
        
            activityHistory.appendChild(p)
        }
    }else {
        emptyMassage?.remove(); 
    }
};

checkEmptyMassage(); 

// Create Status Flower Class 
class flowerStatus {
    constructor(water, sunlight, health, mood) {
        this.water = parseInt(water); 
        this.sunlight = parseInt(sunlight); 
        this.health = parseInt(health); 
        this.mood = mood; 
    }

    addWater() {
        this.water += 5;
        if (this.water > 100) this.water = 100;
    }

    addSunlight() {
        this.sunlight += 5;
        if (this.sunlight > 100) this.sunlight = 100;
    }

    addFertilizer() {
        this.health += 5;
        if (this.health > 100) this.health = 100;
    }

    talkToFlower() {
        const randomNumber = Math.floor(Math.random() * 3);
        if(randomNumber === 0) this.mood = 'Sad 🥲';
        if(randomNumber === 1) this.mood = 'Happy 🌼';
        if(randomNumber === 2) this.mood = 'Very Happy 🌻';
    }
}

// Create New Flower From FlowerStatus Class 
const newFlower = new flowerStatus(0 , 0 , 0 , 'Sad 🥲'); 

// Create Status Panel Function 
const statusPanelItem = (status) => {
    statusPanel.innerHTML = 
    `
    <h1 class="text-xl text-center font-semibold">🌞 Status Panel </h1>
    <!-- Progress Bar Start -->
    <div class="grid md:grid-cols-2 md:gap-5 items-center ">
        <!-- Progress Bar 1 Start -->
        <div>
            <div class="flex justify-between"> 
                <p>Water : <p>
                <p>${status.water}%</p>
            </div>  
            <progress value="${status.water}" max="100" class="w-full h-3 [&::-webkit-progress-bar]:bg-slate-500/40 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-blue-500"></progress> 
        </div>  
        <!-- Progress Bar 1 End --> 

        <!-- Progress Bar 2 Start -->
        <div>
            <div class="flex justify-between"> 
                <p>Sunlight : <p>
                <p>${status.sunlight}%</p>
            </div>  
            <progress value="${status.sunlight}" max="100" class="w-full h-3 [&::-webkit-progress-bar]:bg-slate-500/40 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-yellow-500"></progress> 
        </div>  
        <!-- Progress Bar 2 End --> 

        <!-- Progress Bar 3 Start -->
        <div>
            <div class="flex justify-between"> 
                <p>Health : <p>
                <p>${status.health}%</p>
            </div>  
            <progress value="${status.health}" max="100" class="w-full h-3 [&::-webkit-progress-bar]:bg-slate-500/40 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-green-500"></progress> 
        </div>  
        <!-- Progress Bar 3 End --> 

        <!-- Mood Flower Start -->
        <div class="flex justify-between items-center"> 
            <p>Mood : </p>
            <p class="font-semibold">${status.mood}</p>
        </div> 
        <!-- Mood Flower End --> 
    </div>  
    <!-- Progress Bar End -->
    `
    ;
};

// Run Stauts Panel Function 
statusPanelItem(newFlower); 

// Create Check Flower Expression Function
const checkFlower = () => {
    // HAPUS aksesoris lama biar tidak menumpuk
    const oldAcc = flowerHead.querySelectorAll('.flower-accessory');
    oldAcc.forEach(e => e.remove());

    // --- SAD CONDITION ---
    if (
        newFlower.water < 30 &&
        newFlower.sunlight < 30 &&
        newFlower.health < 30
    ) {
        flower.classList.add('rotate-15');
        flower.classList.remove('scale-105');

        flowerHead.classList.add('!bg-yellow-800');
        flowerHead.textContent = `🥲`;
    }

    // --- FULL HAPPY CONDITION ---
    else if (
        newFlower.water >= 100 &&
        newFlower.sunlight >= 100 &&
        newFlower.health >= 100
    ) {
        flower.classList.add('scale-105');

        flowerHead.classList.add('!bg-pink-500');
        flowerHead.textContent = `🌞`;

        // Aksesori kiri
        const leftAcc = document.createElement('div');
        leftAcc.className =
            `flower-accessory absolute bg-pink-300 p-4 rounded-full ` +
            `-translate-x-[180%] -translate-y-[200%]`;
        flowerHead.appendChild(leftAcc);

        // Aksesori kanan
        const rightAcc = document.createElement('div');
        rightAcc.className =
            `flower-accessory absolute bg-pink-300 p-4 rounded-full ` +
            `translate-x-[80%] -translate-y-[200%]`;
        flowerHead.appendChild(rightAcc);
    }

    // --- NORMAL CONDITION ---
    else {
        flower.classList.remove('rotate-15');
        flower.classList.remove('scale-105')
        flowerHead.classList.remove('!bg-yellow-800');
        flowerHead.classList.add('!bg-yellow-400');

        flowerHead.textContent = `🙂`;
    }
};

// Create All Buttons Functions
waterBtn.addEventListener('click', (e)=> {
    e.preventDefault(); 
    newFlower.addWater(); 
    statusPanelItem(newFlower); 
    checkFlower(); 

    const p = document.createElement('p');
    p.className = `text-semibold text-left`;
    p.textContent = `- You give water to the flowers 🫗`;  

    activityHistory.appendChild(p);
    checkEmptyMassage();  
});

sunBtn.addEventListener('click', (e)=> {
    e.preventDefault(); 
    newFlower.addSunlight(); 
    statusPanelItem(newFlower); 
    checkFlower(); 

    const p = document.createElement('p');
    p.className = `text-semibold text-left`;
    p.textContent = `- You give sunlight to the flowers ☀️`;  

    activityHistory.appendChild(p);
    checkEmptyMassage();  
});

fertilizerBtn.addEventListener('click', (e)=> {
    e.preventDefault(); 
    newFlower.addFertilizer(); 
    statusPanelItem(newFlower); 
    checkFlower(); 

    const p = document.createElement('p');
    p.className = `text-semibold text-left`;
    p.textContent = `- You give fertilizer to the flowers 🌱`;  

    activityHistory.appendChild(p);
    checkEmptyMassage();  
});

talkBtn.addEventListener('click', (e)=> {
    e.preventDefault(); 
    newFlower.talkToFlower();
    statusPanelItem(newFlower)

    const p = document.createElement('p');
    p.className = `text-semibold text-left`;
    p.textContent = `- You are initiating a small talk 💬`;   

    activityHistory.appendChild(p);
    checkEmptyMassage();  
});

// Create a function for subtracting Status
const subtractingStatus = () => {
    if (newFlower.water > 0) newFlower.water -= 5;
    if (newFlower.sunlight > 0) newFlower.sunlight -= 5;
    if (newFlower.health > 0) newFlower.health -= 5;

    statusPanelItem(newFlower);
    checkFlower();
};

// Call Function Every 10 Second 
setInterval(subtractingStatus, 10000)
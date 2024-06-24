let timerId = null;  
let workHours = 0;  
let rate = 0;  
let salaryHistory = []; // 用于存储历史工资记录 
  
function startTimer() {  
    // 获取时薪  
    rate = parseFloat(document.getElementById('rate').value);  
    if (isNaN(rate) || rate <= 0) {  
        alert('请输入有效的时薪！');  
        return;  
    }  
  
    // 清除之前的计时器（如果有）  
        stopTimer();  
  
    // 更新当前时间和开始计时  
        updateCurrentTime();  
        timerId = setInterval(function() {  
            workHours += 0.000277778; // 假设每秒更新一次，增加0.01小时  
            updateDisplay();  
            addToHistory(); // 添加到历史记录  
        }, 1000); // 每秒执行一次  
    }  
  
function stopTimer() {  
    clearInterval(timerId);  
    timerId = null;  
}  
  
function updateCurrentTime() {  
    const now = new Date();  
    const hours = String(now.getHours()).padStart(2, '0');  
    const minutes = String(now.getMinutes()).padStart(2, '0');  
    const seconds = String(now.getSeconds()).padStart(2, '0');  
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;  
}  

function updateDisplay() {  
    const hours = Math.floor(workHours);  
    const minutes = Math.floor((workHours % 1) * 60);  
    const seconds = Math.round(((workHours % 1) * 60 - minutes) * 60);  
  
    document.getElementById('workHours').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;  
    document.getElementById('salary').textContent = (workHours * rate).toFixed(2);  
}  

function addToHistory() {  
    const salary = (workHours * rate).toFixed(2);  
    const time = new Date().toLocaleTimeString(); // 获取当前时间作为历史记录的时间戳  
    salaryHistory.push({ time, salary });  
    displayHistory();  
}  

function displayHistory() {  
    const historyList = document.getElementById('salaryHistory');  
    historyList.innerHTML = ''; // 清空历史列表  
    for (const entry of salaryHistory) {  
        const listItem = document.createElement('li');  
        listItem.textContent = `${entry.time}: ${entry.salary} 元`;  
        historyList.appendChild(listItem);  
    }  
}  
  
function clearHistory() {  
    salaryHistory = []; // 清空历史记录数组  
    displayHistory(); // 更新显示  
} 
// 页面加载完成后，更新当前时间（可选）  
window.onload = function() {  
    updateCurrentTime();  
};
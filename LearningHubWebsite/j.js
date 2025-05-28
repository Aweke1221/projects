document.addEventListener('DOMContentLoaded', function() {
    const lightModeRadio = document.getElementById('lightMode');
    const darkModeRadio = document.getElementById('darkMode');
    const lightModeRadioMobile = document.getElementById('lightModeMobile');
    const darkModeRadioMobile = document.getElementById('darkModeMobile');

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }

    function setRadioState(darkModeEnabled) {
        lightModeRadio.checked = !darkModeEnabled;
        darkModeRadio.checked = darkModeEnabled;
        lightModeRadioMobile.checked = !darkModeEnabled;
        darkModeRadioMobile.checked = darkModeEnabled;
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        setRadioState(true);
    } else {
        disableDarkMode();
        setRadioState(false);
    }

    lightModeRadio.addEventListener('change', function() {
        disableDarkMode();
        setRadioState(false);
    });

    darkModeRadio.addEventListener('change', function() {
        enableDarkMode();
        setRadioState(true);
    });

    lightModeRadioMobile.addEventListener('change', function() {
        disableDarkMode();
        setRadioState(false);
    });

    darkModeRadioMobile.addEventListener('change', function() {
        enableDarkMode();
        setRadioState(true);
    });

    function showSection(sectionId, event) {
        if (event) {
            event.preventDefault(); // Prevent the default link behavior
        }

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');

            if (sectionId === 'spin') {
                initializeSpinWheel();
            }
        }
    }

    function showHtmlOutput() {
        const outputDiv = document.getElementById('htmlOutput');
        outputDiv.innerHTML = '<p>HTML output will appear here.</p>';
    }

    function showCssOutput() {
        const outputDiv = document.getElementById('cssOutput');
        outputDiv.innerHTML = '<p>CSS output will appear here.</p>';
    }

    function showJsOutput() {
        const outputDiv = document.getElementById('jsOutput');
        outputDiv.innerHTML = '<p>JavaScript output will appear here. Check the console!</p>';
        console.log("Hello from JavaScript!");
    }

    function changeText() {
        const dynamicText = document.getElementById('dynamicText');
        if (dynamicText) {
            dynamicText.textContent = "Text Changed by JavaScript!";
        }
    }

    function showCalculatorOutput() {
        const outputDiv = document.getElementById('projectOutput');
        outputDiv.innerHTML = `
            <div id="calculator">
                <input type="text" id="display" readonly>
                <div class="buttons">
                    <button class="button clear" onclick="clearDisplay()">C</button>
                    <button class="button" onclick="appendToDisplay('/')">/</button>
                    <button class="button" onclick="appendToDisplay('*')">*</button>
                    <button class="button" onclick="appendToDisplay('7')">7</button>
                    <button class="button" onclick="appendToDisplay('+')">+</button>
                    <button class="button" onclick="calculate()">=</button>
                    <button class="button" onclick="appendToDisplay('0')">0</button>
                </div>
            </div>`;
    }

    function showSpinWheelOutput() {
        const outputDiv = document.getElementById('spinOutput');
        initializeSpinWheel();
    }

    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.navbar-links-mobile');
        mobileMenu.classList.toggle('active');
        const menuToggle = document.querySelector('.menu-toggle');
        const closeToggle = document.querySelector('.close-toggle');
        if (mobileMenu.classList.contains('active')) {
            menuToggle.style.display = 'none';
            closeToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'block';
            closeToggle.style.display = 'none';
        }
    }

    function resetProject() {
        const projectContentDiv = document.getElementById('project-content');
        projectContentDiv.innerHTML = '<p id="project-text">Click on a navigation item above to see its content here.</p>';
    }

    function appendToDisplay(value) {
        document.getElementById('display').value += value;
    }

    function clearDisplay() {
        document.getElementById('display').value = '';
    }

    function backspace() {
        let currentValue = document.getElementById('display').value;
        document.getElementById('display').value = currentValue.slice(0, -1);
    }

    function negate() {
        let currentValue = document.getElementById('display').value;
        if (currentValue) {
            if (currentValue[0] === '-') {
                document.getElementById('display').value = currentValue.slice(1);
            } else {
                document.getElementById('display').value = '-' + currentValue;
            }
        }
    }

    function calculate() {
        try {
            let expression = document.getElementById('display').value.replace(/\^/g, '**');
            document.getElementById('display').value = eval(expression);
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculateSquareRoot() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            if (value >= 0) {
                document.getElementById('display').value = Math.sqrt(value);
            } else {
                document.getElementById('display').value = 'Error';
            }
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculateLog() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            if (value > 0) {
                document.getElementById('display').value = Math.log10(value);
            } else {
                document.getElementById('display').value = 'Error';
            }
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculateSin() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            document.getElementById('display').value = Math.sin(value * Math.PI / 180);
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculateCos() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            document.getElementById('display').value = Math.cos(value * Math.PI / 180);
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculateTan() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            document.getElementById('display').value = Math.tan(value * Math.PI / 180);
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function calculatePower() {
        appendToDisplay('^');
    }

    function calculateFactorial() {
        try {
            const value = parseFloat(document.getElementById('display').value);
            if (Number.isInteger(value) && value >= 0) {
                let result = 1;
                for (let i = 2; i <= value; i++) {
                    result *= i;
                }
                document.getElementById('display').value = result;
            } else {
                document.getElementById('display').value = 'Error';
            }
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }

    function openParenthesis() {
        appendToDisplay('(');
    }

    function closeParenthesis() {
        appendToDisplay(')');
    }

    let wheel, spinButton, spinResult, rotation, prizes;

    function initializeSpinWheel() {
        wheel = document.getElementById("wheel");
        spinButton = document.getElementById("spinButton");
        spinResult = document.getElementById("spinResult");
        rotation = 0;
        prizes = ["$1", "$5", "$10", "$25", "$50", "$100", "$200", "$500"];
        spinButton.onclick = function() {
            let spinDegree = Math.floor(Math.random() * (3600 - 3000 + 1)) + 3000;
            rotation += spinDegree;
            wheel.style.transform = "rotate(" + rotation + "deg)";

            setTimeout(() => {
                let normalizedRotation = rotation % 360;
                let prizeIndex = Math.floor((360 - normalizedRotation) / (360 / prizes.length));
                if (prizeIndex >= prizes.length) {
                    prizeIndex = 0;
                }
                spinResult.innerHTML = "You won " + prizes[prizeIndex] + "!";
            }, 5000);
        };
    }

    function runFlexboxExample() {
        const output = document.getElementById('flexbox-output');
        output.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100px;">
                <div style="width: 50px; height: 50px; background-color: lightblue; margin: 10px;"></div>
                <div style="width: 50px; height: 50px; background-color: lightblue; margin: 10px;"></div>
            </div>`;
    }

    function runGridExample() {
        const output = document.getElementById('grid-output');
        output.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">1</div>
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">2</div>
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">3</div>
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">4</div>
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">5</div>
                <div style="background-color: lightcoral; padding: 20px; text-align: center;">6</div>
            </div>`;
    }

    function runTransitionsExample() {
        const output = document.getElementById('transitions-output');
        output.innerHTML = `<div style="width: 100px; height: 100px; background-color: lightgreen; transition: all 0.5s ease;">Hover me!</div>`;
    }

    function runTransformsExample() {
        const output = document.getElementById('transforms-output');
        output.innerHTML = `<div style="width: 100px; height: 100px; background-color: lightyellow; transform: rotate(45deg);">Transform Me!</div>`;
    }

    function runPseudoExample() {
        const output = document.getElementById('pseudo-output');
        output.innerHTML = `<a href="#" style="color: blue;">Hover over me</a><p style="font-size: 18px;">This is a paragraph. The first line will be bold.</p>`;
    }

    function runResponsiveExample() {
        const output = document.getElementById('responsive-output');
        output.innerHTML = `<p>Resize the window to see responsive changes.</p>`;
    }

    function runVariablesExample() {
        const output = document.getElementById('variables-output');
        output.innerHTML = `<h1 style="color: var(--primary-color);">CSS Variables Example</h1>`;
    }

    function runAnimationExample() {
        const output = document.getElementById('animation-output');
        output.innerHTML = `
        <div style="width:100px; height:100px; background-color:lightblue; animation:slide 2s infinite alternate;"></div>
        `;
    }

    function showCode(codeId) {
        const codeDisplayArea = document.getElementById(codeId);
        codeDisplayArea.classList.toggle('show');
    }

    showSection('html', null); // Show the HTML section by default
});
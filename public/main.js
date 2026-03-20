class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getRandomColor();

        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: ${color};
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-family: 'Nanum Gothic', sans-serif;
                    font-weight: 600;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                    animation: appear 0.5s ease-out forwards;
                }

                @keyframes appear {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getRandomColor() {
        const colors = [
            '#f39c12', '#e74c3c', '#3498db', '#9b59b6', '#2ecc71',
            '#1abc9c', '#d35400', '#c0392b', '#2980b9', '#8e44ad'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateLottoNumbers();

    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        }, index * 200); // 딜레이를 주어 순차적으로 나타나는 효과
    });
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

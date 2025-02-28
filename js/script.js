//1. 계산기 화면과 버튼 목록 가져오기
document.addEventListener('DOMContentLoaded', function () {

    const screen = document.querySelector('#display')
    const btns = document.querySelectorAll('#buttons button')

    let expression = ''


    //2. 모든 버튼에 클릭 이벤트 추가
    btns.forEach(btn => {
        btn.addEventListener('click', () => handleInput(btn.textContent))
    })

    //3. 버튼 클릭 시 동작을 처리하는 함수
    function handleInput(val) {
        const lastChar = expression.slice(-1) //현재 입력된 수식의 마지막 문자 가져오기
        //console.log(val)

        if (isNumber(val)) {
            appendToExpression(val)
        } else if (isOperator(val)) {
            //연산자가 연속으로 입력되지 않도록 방지
            if (!isOperator(lastChar)) appendToExpression(val)
        } else if (val === 'C') {
            clearExpression()
        } else if (val === '=') {
            calculateResult()
        }
    }

    //4. 입력값이 숫자인지 '.'인지 확인하는 함수
    function isNumber(val) {
        return !isNaN(val)
    }

    //5. 입력값이 연산자인지 확인하는 함수
    function isOperator(val) {
        return "+-*/".includes(val)
    }

    //6. 수식에 값을 추가하고 화면에 표시하는 함수
    function appendToExpression(val) {
        expression += val
        screen.value = expression
    }

    //7. 'C' 버튼을 눌렀을 때 계산기를 초기화하는 함수
    function clearExpression() {
        expression = ''
        screen.value = '0'
    }

    // 8. '=' 버튼을 눌렀을 때 계산 결과를 표시하는 함수
    function calculateResult() {
        try {
            const result = eval(expression)
            if(isFinite(result)){
                expression = String(result)
                screen.value = expression
            } else {
                throw new Error('계산 오류입니다.')
            }
        } catch {
            clearExpression()
            screen.value = 'Error'
        }

    }

})//end
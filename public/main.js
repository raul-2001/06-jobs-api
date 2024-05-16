const formDOM = document.querySelector('.form')
const userNameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')

formDOM.addEventListener('submit', async (e) => {
    formAlertDOM.classList.remove('text-success')

    e.preventDefault()

    const email = userNameInputDOM.value
    const password = passwordInputDOM.value
    console.log('username >>', email)
    console.log('password >>', password)

    try {
        console.log('start')
        const {data} = await axios.post('api/v1/auth/logon', {email, password})
        console.log({data})
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = data.msg

        formAlertDOM.classList.add('text-success')
        userNameInputDOM.value = ''
        passwordInputDOM.value = ''

        localStorage.setItem('token', data.token)
        


    } catch (error) {
        formAlertDOM.style.display =  'block'
        formAlertDOM.textContent = error.response.data.msg
        localStorage.removeItem('token')
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 2000)



})
const emailID = document.getElementById('email');
const btn = document.getElementById('button');
const pass = document.getElementById('password');
const pass2 = document.getElementById('password2');

btn.addEventListener('click', () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\/-]?\w+)*(\.\w{2,3})+$/;
    if (emailID.value.match(mailformat)) {
        alert('Valid email address!');
        document.signupForm.email.focus();
        return true;
    } else {
        alert('You have entered an invalid email address!');
        document.signupForm.email.focus();
        return false;
    };    
});

btn.addEventListener('click', () => {
    if (pass.value === pass2.value) {
        return true;
    } else {
        alert('Password does not match');
        return false;
    };
});
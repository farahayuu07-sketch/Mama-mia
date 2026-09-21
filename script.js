document.addEventListener('DOMContentLoaded', function() {

    var hamburger = document.getElementById('hamburgerBtn');
    var navMenu = document.getElementById('navMenu');
    
    if(hamburger != null && navMenu != null) {
        hamburger.addEventListener('click', function() {
            if(navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                var spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0deg) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg) translate(0, 0)';
            } else {
                navMenu.classList.add('show');
                var spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            }
        });
    }
    
    var header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 50) {
                header.style.backgroundColor = '#3a0808';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = '#5c0e0e';
                header.style.padding = '15px 0';
            }
        });
    }
    
    var orderBtns = document.querySelectorAll('.btn-order');
    for(var i = 0; i < orderBtns.length; i++) {
        orderBtns[i].addEventListener('click', function(e) {
            var dishName = this.getAttribute('data-dish');
            localStorage.setItem('selectedDish', dishName);
            alert('✅ ' + dishName + ' dipilih!');
        });
    }
    
    var savedDish = localStorage.getItem('selectedDish');
    if(savedDish != null) {
        var menuSelect = document.getElementById('menuSelect');
        if(menuSelect) {
            for(var i = 0; i < menuSelect.options.length; i++) {
                if(menuSelect.options[i].value === savedDish) {
                    menuSelect.value = savedDish;
                    break;
                }
            }
        }
        localStorage.removeItem('selectedDish');
    }
    
    var orderForm = document.getElementById('orderForm');
    
    if(orderForm) {
        
        function validateName() {
            var nama = document.getElementById('fullName');
            var error = document.getElementById('nameError');
            if(nama == null) return true;
            
            var nilai = nama.value.trim();
            if(nilai === '') {
                error.style.display = 'block';
                error.innerHTML = '✕ Nama harus diisi!';
                return false;
            }
            if(nilai.length < 2) {
                error.style.display = 'block';
                error.innerHTML = '✕ Nama minimal 2 huruf!';
                return false;
            }
            error.style.display = 'none';
            return true;
        }
        
        function validatePhone() {
            var telp = document.getElementById('phoneNumber');
            var error = document.getElementById('phoneError');
            if(telp == null) return true;
            
            var nilai = telp.value.trim();
            if(nilai === '') {
                error.style.display = 'block';
                error.innerHTML = '✕ No telepon harus diisi!';
                return false;
            }
            
            var jumlahDigit = 0;
            for(var i = 0; i < nilai.length; i++) {
                var ch = nilai[i];
                if(ch >= '0' && ch <= '9') {
                    jumlahDigit++;
                }
            }
            
            if(jumlahDigit < 10) {
                error.style.display = 'block';
                error.innerHTML = '✕ No telepon minimal 10 digit!';
                return false;
            }
            
            error.style.display = 'none';
            return true;
        }
        
        function validateMenu() {
            var menu = document.getElementById('menuSelect');
            var error = document.getElementById('menuError');
            if(menu == null) return true;
            
            if(menu.value === '' || menu.value === null) {
                error.style.display = 'block';
                error.innerHTML = '✕ Pilih menu dulu!';
                return false;
            }
            error.style.display = 'none';
            return true;
        }
        
        function validatePayment() {
            var payments = document.querySelectorAll('input[name="payment"]');
            var error = document.getElementById('paymentError');
            var adaYangDipilih = false;
            
            for(var i = 0; i < payments.length; i++) {
                if(payments[i].checked) {
                    adaYangDipilih = true;
                    break;
                }
            }
            
            if(!adaYangDipilih) {
                error.style.display = 'block';
                error.innerHTML = '✕ Pilih metode bayar!';
                return false;
            }
            error.style.display = 'none';
            return true;
        }
        
        function validateService() {
            var services = document.querySelectorAll('input[name="service"]');
            var error = document.getElementById('serviceError');
            var adaYangDipilih = false;
            
            for(var i = 0; i < services.length; i++) {
                if(services[i].checked) {
                    adaYangDipilih = true;
                    break;
                }
            }
            
            if(!adaYangDipilih) {
                error.style.display = 'block';
                error.innerHTML = '✕ Pilih pick-up atau delivery!';
                return false;
            }
            error.style.display = 'none';
            return true;
        }
        
        var inputNama = document.getElementById('fullName');
        if(inputNama) {
            inputNama.addEventListener('input', validateName);
            inputNama.addEventListener('blur', validateName);
        }
        
        var inputTelp = document.getElementById('phoneNumber');
        if(inputTelp) {
            inputTelp.addEventListener('input', validatePhone);
            inputTelp.addEventListener('blur', validatePhone);
        }
        
        var selectMenu = document.getElementById('menuSelect');
        if(selectMenu) {
            selectMenu.addEventListener('change', validateMenu);
        }
        
        var radioPayments = document.querySelectorAll('input[name="payment"]');
        for(var i = 0; i < radioPayments.length; i++) {
            radioPayments[i].addEventListener('change', validatePayment);
        }
        
        var radioServices = document.querySelectorAll('input[name="service"]');
        for(var i = 0; i < radioServices.length; i++) {
            radioServices[i].addEventListener('change', validateService);
        }
        
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var valid1 = validateName();
            var valid2 = validatePhone();
            var valid3 = validateMenu();
            var valid4 = validatePayment();
            var valid5 = validateService();
            
            if(valid1 && valid2 && valid3 && valid4 && valid5) {
                var nama = document.getElementById('fullName').value;
                var menu = document.getElementById('menuSelect').value;
                alert('Order berhasil! Terima kasih ' + nama + '! Pesanan ' + menu + ' akan segera diproses.');
                orderForm.reset();
                var semuaError = document.querySelectorAll('.error');
                for(var i = 0; i < semuaError.length; i++) {
                    semuaError[i].style.display = 'none';
                }
            } else {
                alert('Lengkapi data dengan benar!');
            }
        });
    }
    
    document.addEventListener('mouseenter', function() {
        console.log('mouse masuk');
    });
    
    document.addEventListener('mouseleave', function() {
        var randomWarna = Math.floor(Math.random() * 3);
        if(randomWarna === 0) {
            document.body.style.backgroundColor = '#faf5ec';
        } else if(randomWarna === 1) {
            document.body.style.backgroundColor = '#f5efe8';
        } else {
            document.body.style.backgroundColor = '#fdf8f0';
        }
    });
    
    document.addEventListener('keypress', function(event) {
        console.log('tombol: ' + event.key);
    });
    
    var menuList = ['Pasta', 'Pizza', 'Dessert'];
    menuList.push('Beverages');
    
    for(var i = 0; i < menuList.length; i++) {
        console.log(menuList[i]);
    }
    
    console.log(Math.floor(3.24));
    console.log(Math.ceil(3.14));
    console.log(Math.round(3.14));
    
    var semuaCard = document.querySelectorAll('.card, .menu-card, .reward-card');
    for(var i = 0; i < semuaCard.length; i++) {
        semuaCard[i].addEventListener('mouseenter', function() {
            console.log('hover card');
        });
    }
    
    var elems = document.querySelectorAll('.card, .menu-card, .reward-card, .founder-card');
    function checkScroll() {
        for(var i = 0; i < elems.length; i++) {
            var pos = elems[i].getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            if(pos < windowHeight - 100) {
                elems[i].style.opacity = '1';
                elems[i].style.transform = 'translateY(0)';
            }
        }
    }
    
    for(var i = 0; i < elems.length; i++) {
        elems[i].style.opacity = '0';
        elems[i].style.transform = 'translateY(25px)';
        elems[i].style.transition = 'all 0.5s ease';
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
});
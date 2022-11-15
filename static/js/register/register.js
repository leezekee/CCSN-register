// 表单清除
$('#clear-btn').click(function(){
    $.confirm({
        title: '确认',
        content: '确认清空？',
        type: 'red',
        buttons: {
            ok: {
                text: '确认',
                btnClass: 'btn-danger',
                action: function() {
                    document.getElementById('sign-in').reset() 
                }
            },
            cancel: {
                text: '取消',
                btnClass: 'btn-primary'
            }
        }
    })
})

// =========================== 检验合法性 =========================

function validTel(tel) {
    if (tel.length === 11) {
        let reg = /^\d+$/
        if (reg.test(tel)) {
            return true
        }
    } 
    return false
}

function check(id) {
    const obj = $('#'+id)
    if (obj.val() === '') {
        obj.addClass('is-invalid')
        return false
    } else {
        if (obj.hasClass("is-invalid")) {
            obj.removeClass("is-invalid")
        }
        obj.addClass("is-valid")
        return true
    }
}

function checkEmail() {
    let email = $("#Email")
    if (email .val() === '' || !validEmail(email .val())) {
        email .addClass('is-invalid')
        return false
    } else {
        if (email .hasClass("is-invalid")) {
            email .removeClass("is-invalid")
        }
        email .addClass("is-valid")
        return true
    }
}

function checkTel() {
    let tel = $("#Tel")
    if (tel.val() === '' || !validTel(tel.val())) {
        tel.addClass('is-invalid')
        return false
    }else {
        if (tel.hasClass("is-invalid")) {
            tel.removeClass("is-invalid")
        }
        tel.addClass("is-valid")
        return true
    }
}

function validEmail(email) {
    return !(email.length <= 4 || email.indexOf('@', 0) === -1 || email.indexOf('.', 0) === -1)
}

function checkValid() {
    let cnt = 0
    if (check("Name")) cnt++
    if (checkEmail()) cnt++
    if (checkTel()) cnt++
    if (check("School")) cnt++
    if (check("Major")) cnt++
    if (check("selfIntro")) cnt++
    return cnt === 6
}
// =====================================================


// 提交
function submit() {
    let formData = {
        "name": $("#Name").val(),
        "email": $("#Email").val(),
        "tel": $("#Tel").val(),
        "school": $("#School").val(),
        "major": $("#Major").val(),
        "class": $("#Cls").val(),
        "intro": $("#selfIntro").val()
    }
    // console.log(formData)
    fetch("http://" + window.location.host + "/reg/data", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(data =>{
            if (data['status'] === "success") {
                $.confirm({
                    title: '提醒',
                    content: '提交成功',
                    type: 'green',
                    buttons: {
                        ok: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                console.log(formData)
                                window.location.href = "http://" + window.location.host + "/reg"
                            }
                        }
                    }
                })
            } else {
                $.confirm({
                    title: '提醒',
                    content: '提交失败',
                    type: 'red',
                    buttons: {
                        ok: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function() {
                                // 提交失败后操作
                            }
                        }
                    }
                })
            }
        })
}

// 表单提交
$('#submit-btn').click(function(){
    if (checkValid()) {
        $.confirm({
            title: '提交',
            content: '确认提交？(多次提交按最后一次为准)',
            type: 'green',
            buttons: {
                ok: {
                    text: '确认',
                    btnClass: 'btn-primary',
                    action: function() {
                        submit()
                    }
                },
                cancel: {
                    text: '取消',
                    btnClass: 'btn-primary'
                }
            }
        })
    }

})
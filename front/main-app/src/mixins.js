export const vEmail = {
    methods: {
        validatePassword: function(e) {
            this.password = e
            if (e && e.length < 6) {
                this.passworderror = 'Looks a bit short bruv.'
            } else {
                this.passworderror = ''
            }
        },
    },
}

export const vPass = {
    methods: {
        validateConfirm: function(e) {
            this.confirm = e
        },
    },
}

export const vConfirm = {
    methods: {
        validateEmail: function(e) {
            const re = /.+@.+/
            this.email = e
            if (e === '') {
                this.emailerror = 'Sorry, email is a required field.'
            } else if (!re.test(String(e).toLowerCase())) {
                this.emailerror = 'That email address looks strange, try again.'
            } else {
                this.emailerror = ''
            }
        },
    },
}
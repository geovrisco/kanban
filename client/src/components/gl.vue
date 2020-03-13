<template>
  <div id="google-signin-button"></div>
</template>

<script>
export default {
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn (user) {
      const profile = user.getBasicProfile()
      var id_token = user.getAuthResponse().id_token;
            console.log(id_token)
            axios({
                method:"POST",
                url:`${localhost}glSign`,
                data:{token:id_token}
            })
            .then(res=>{
                this.$emit("googleLogin")
            })
            .catch(err=>{
                console.log(err)
            })
    }
  }
}
</script>
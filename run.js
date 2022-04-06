     const axios = require('axios');

      const token = '';

	const updateRamp = async function() {
        const url = 'https://useragreement.vip.qa.ebay.com/identity/user_agreement/v1/user_ramp/ebay_balance/update_ramp_status'
        const header = { authorization : `bearer ${token}`, 'Access-Control-Allow-Origin': '*'}
        //const res = await axios.post(url, {}, {headers: header});
        axios({url, method: 'POST', headers: header})
        .then( res => {
          console.log(res);
          console.log(res.getStatusCode);
          console.log('hello')
        })
      }

     const run = async function() {
        try{
            update_ramp_res = await updateRamp();
        } catch (e) {
            console.log(e)
        }
    }


    run();
<template>
  <div class="main">
  <span class="heading"> Gomathi Homoeo Clinic - Directory</span>
    <div v-show="showAddPatient" class="add-parent">
    <span class="add-item-title"> Add Patient </span>
      <input class="add-item" placeholder="Name" v-model="patientEntry.name"/>
      <input class="add-item" placeholder="Case Number" v-model="patientEntry.case"/>
      <input class="add-item" placeholder="Phone Number" v-model="patientEntry.phone"/>
      <span class="add-item more" @click="toggleMoreAdd"> More options </span>
        <input v-if="showMoreAdd" class="add-item" placeholder="Address" v-model="patientEntry.address"/>
        <input v-if="showMoreAdd" class="add-item" placeholder="Comments" v-model="patientEntry.comments"/>
      <div class="add-item-submit" @click="addClicked"> Add </div>
    </div>

    <div v-show="showPatientView" class="show-patient">
      <span class="view-patient-title"> {{showPatient.name}} </span>
      <span> <b> Case number: </b> {{showPatient.case}}</span>
      <span v-show="showPatient.phone"> <b> Phone number: </b> {{showPatient.phone}}</span>
      <span v-show="showPatient.address"> {{showPatient.address}} </span>
      <span v-show="showPatient.comments"> {{showPatient.comments}} </span>

      <div class="button-show-add" @click="showAddPatient=true; showPatientView=false"> Add new patient </div>
    </div>

    <span class="search-home-heading"> Search </span>
    <Search ref="dash" @patientClicked="showPatientClick" />
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import Search from './Search.vue';

export default {
  name: 'Home',
    components: {
      Search
  },
  mounted() {

  },
  methods: {
    ...mapActions(['addPatient']),
    addClicked() {
      if (!this.patientEntry.name || !this.patientEntry.case) {
        window.alert("Patient Name and case number can't be empty");
        return;
      }
      this.addPatient(this.patientEntry)
      .then(res => {
        this.patientEntry = {};
        this.$refs.dash.load();
      })
      .catch(err => console.log(err));
    },
    toggleMoreAdd() {
      this.showMoreAdd = true;
    },
    showPatientClick(obj) {
      this.showPatient = obj;
      this.showAddPatient = false;
      this.showPatientView = true;
    }
  },
  data() {
    return {
      showPatient: {},
      showAddPatient: true,
      showPatientView: false,
      patientEntry: {
        name: null,
        phone: null
      },
      showMoreAdd: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Public+Sans);
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFB;
}
.show-patient {
  display: flex;
  flex-direction: column;
  background-color: #D0D0D0;
  width: 400px;
  min-height: 200px;
  font-family: Public Sans;
  font-size: 13px;
  gap: 10px;
}
.button-show-add {
  width: 120px;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  height: 30px;
  color: white;
  background-color: #070e66;
  font-family: Public Sans;
  font-size: 12px;
  line-height: 30px;
  border-radius: 3px;
  cursor: pointer;
}
.view-patient-title {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #070e66
}
.add-parent {
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #D0D0D0;
  justify-content: center;
  gap: 10px;
  font-family: Public Sans;
  font-size: 18px;
  font-style: normal;

}
.add-item {
  width: 150px;
  height: 25px;
  margin: auto;
  font-family: Public Sans;
  font-style: normal;
  font-size: 12px;
}
.add-item-submit {
  width: 160px;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 10px;
  height: 30px;
  color: white;
  background-color: #070e66;
  font-family: Public Sans;
  font-weight: bold;
  font-size: 15px;
  line-height: 30px;
  border-radius: 3px;
  cursor: pointer;
}
.more {
  background-color: #8a8a8a;
  width: 80px;
  height: 20px;
  color: white;
  line-height: 20px;
  font-size: 10px;
  cursor: pointer;
  border-radius: 2px;
}
.heading {
  font-size: 20px;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  background-color: #070e66;
  color: white;
}
.add-item-title {
  font-size: 16px;
  margin-top: 20px;
  font-weight: bold;
  color: #070e66
}
.search-home-heading {
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
  color: #070e66;
  margin-top: 40px;
}

@media only screen and (max-width: 600px) {
  .add-parent {
    width: 340px;
  }
}
</style>
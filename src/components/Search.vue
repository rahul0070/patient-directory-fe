<template>
  <div class="search-parent">
  <div class="search-bar-parent">
    <input placeholder="Search" v-model="searchTermEntered">
    <button @click="search"> Search </button>
  </div>
  <span v-show="searchClicked"> Showing results for "{{searchTerm}}" </span>
  <button @click="clearSearch"> Clear search </button>

  <div class="search-nav">
    <span v-show="pagination.show"> Showing {{pagination.lRange}} to {{pagination.hRange}} of {{pagination.total}} </span>
    <button v-show="isShow('next')" @click="updatePagination('next')"> Next </button>
    <button v-show="isShow('prev')" @click="updatePagination('prev')" > Prev </button>
  </div>
    <div class="search-table">
        <div class="search-row heading">
            <div class="search-row-name"> Name </div>
            <div class="search-row-case"> Case Number </div>
            <div class="search-row-phone"> Phone Number </div>
            <div class="search-row-clinic"> Clinic </div>
            <div class="search-row-updated"> Updated on </div>
        </div>
        <div class="search-row" @click="$emit('patientClicked', patient)" v-for="patient in patientsData" :key="patient._id">
            <div class="search-row-name"> {{patient.name}} </div>
            <div class="search-row-case"> {{patient.case}} </div>
            <div class="search-row-phone"> {{patient.phone}} </div>
            <div class="search-row-clinic"> {{patient.clinic}} </div>
            <div class="search-row-updated"> {{parseDate(patient.created_on)}} </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
export default {
  name: 'Home',
    components: {
  },
    computed: {
    ...mapGetters(['signedIn', 'patientsData']),
    ...mapState(['pagination'])
  },
  mounted() {
      this.load()
  },
  methods: {
      ...mapActions(['getAll', 'setPagination', 'triggerSearch']),
      load() {
          this.getAll()
          .then(res => {
              console.log('Get All', this.patientsData);
                
          });
      },
      search() {
          this.searchClicked = true;
            this.searchTerm = this.searchTermEntered;
            this.triggerSearch(this.searchTerm)
            .then( res => {
                this.load();
            })
            .catch(err => console.log(err));
      },
      clearSearch() {
          this.searchClicked = false;
          this.searchTerm = '';
          this.cancelSearch()
          .then( res => {
              console.log('Search cancelled');
          })
      },
      parseDate(str) {
          const d = new Date(str);
          console.log(d.getDate(), d.getMonth(), d.getYear())
          if (!d) return '';
          return `${d.getDate()+1} / ${d.getMonth()+1} / ${d.getYear().toString()}`;
      },
      updatePagination(type) {
          if (type === 'next') {
              let next = this.pagination.hRange + 15;
              if (next > this.pagination.total) next = this.pagination.total;
              this.setPagination({lRange: this.pagination.lRange+15, hRange: next});
          }
          else {
              let prev = this.pagination.lRange - 15;
              if (prev < 0) prev = 0;
              this.setPagination({lRange: prev, hRange: prev+15});
          }
      },
      isShow(type) {
          if (type === 'next') {
              if (this.pagination.total > this.pagination.hRange) {
                  return true
              }
          }
          else {
              if (0 < this.pagination.lRange) {
                  return true
              }
          }
          return false;
      }
  },
  data() {
    return {
        searchTerm: '',
        searchTermEntered: '',
        searchClicked: false,
        paginationUI: {
            show: false,
            next: false,
            prev: false
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Public+Sans);
.search-parent {
  font-family: Public Sans;
  font-style: normal;
  font-size: 13px;
  margin: 10px;
}
.search-bar-parent {
    margin-bottom: 20px;
    margin-top: 15px;
}
.search-nav {
    display: flex;
    height: 20px;
    gap: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 20px;
}
.search-nav button {
    font-size: 12px;
}
.search-table {
    width: 900px;
    border: 1px solid #dddddd;
}
.search-row {
    display: flex;
    padding: 5px;
    border: 1px solid #dddddd;
    cursor: pointer;
    text-align: left;
}
.search-row-name {
    width: 20%;
}
.search-row-case {
    width: 20%;
}
.search-row-updated {
    width: 20%;
}
.search-row-phone {
    width: 20%;
}
.search-row-clinic {
    width: 20%;
}
.heading {
    font-weight: bold;
    background-color: #D0D0D0;
    font-size: 13px;
}

@media only screen and (max-width: 600px) {
    .search-table {
        width: 360px;
    }
    .search-row-updated {
        display: none;
    }
    .search-row-clinic {
        display: none;
    }
    .search-row-name {
    width: 33%;
    }
    .search-row-case {
        width: 33%;
    }
    .search-row-phone {
    width: 33%;
    }
}
</style>
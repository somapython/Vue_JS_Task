<template>
    <div id="app">
        <header class="container-fluid pt-3 pb-5">
            <img src="../assets/banner.png" class="img-fluid w-100" alt="Banner" style="max-height: 150px; object-fit: cover;">
        </header>
        <section class="container-fluid d-flex align-items-center justify-content-center">
            <div class="text-center">
                <div class="d-flex align-items-center justify-content-center flex-wrap">
                <h2 class="text-danger me-3 custom-weight responsive-heading">What is WizFit Challenge?</h2>
                <button class="btn btn-danger btn-lg d-flex align-items-center responsive-button">
                    <i class="bi bi-play-fill me-2"></i> Watch Video
                </button>
                </div>
            </div>
        </section>
        <section class="container text-center py-3">
            <div class="container">
                <img src="../assets/player.png" alt="Challenge" class="img-fluid mx-auto d-block imageHeight" style="max-width: 100%; height: auto;">
                <div class="border border-secondary-subtle rounded custom-shadow p-4">
                    <h2 class="fs-3 fs-md-4 fs-lg-5 fw-bold text-danger my-4">Are you ready to take the challenge?</h2>
                    <p class="fw-bolder fs-5">Download Harlem Wizards App</p>
                    <div class="mt-3 appdownload-platform d-flex justify-content-center">
                        <img src="../assets/goolge-store.png" alt="google_store" class="me-3 img-fluid" style="max-width: 150px;">
                        <img src="../assets/apple-store.png" alt="apple_store" class="img-fluid" style="max-width: 150px;">
                    </div>
                    <div class="text-center my-3 d-flex align-items-center justify-content-center">
                        <div class="line-container">
                            <span>or you can sign up right now</span>
                        </div>
                    </div>
                    <div class="my-4">
                        <input type="text"  v-model="searchData" @input="onSearchInput" class="form-control w-50 mx-auto" placeholder="Search School name">
                    </div>
                    <div v-if="loading" class="text-center my-4">
                        <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading data...</span>
                        </div>
                    </div>
                    <div v-if="!loading && filteredItems.length === 0" class="text-center my-5">
                        <p class="text-muted fs-5">No Data Found</p>
                    </div>
                    <div v-if="errorMessage" class="alert alert-danger">
                        {{ errorMessage }}
                    </div>
                    <div v-if="!loading  && !errorMessage && filteredItems.length > 0" class="mt-3">
                        <div class="d-flex flex-wrap justify-content-center">
                            <div class="card mb-4 mx-3" v-for="item in filteredItems" :key="item.id" style="max-width: 500px; width: 100%;">
                                <div class="card-body d-flex align-items-center justify-content-between">
                                    <img  v-lazy="item.logo" class="item-image me-3 img-fluid" style="max-width: 50px;" alt="Item Image">
                                    <div class="item-details me-auto">
                                        <h6 class="card-title mb-0 text-truncate" style="max-width: 200px;">{{ item.school_name }}</h6>
                                    </div>
                                    <button class="btn btn-danger" @click="joinCampaignClick(item.id)">Join Campaign</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     </div>
</template>

<script>
export default {
  name: 'HomeWorld',
  data() {
    return {
     schoolData: [],
      searchData: '', 
      filteredItems: [], 
      loading: false, 
      errorMessage: '',
      searchTimeout: null,
    };
  },
  created() {
    this.fetchItems(); 
  },
  methods: {
    async fetchItems() {
      this.loading = true; 
      this.errorMessage = '';
      try {
        const response = await fetch('http://api.devharlemwizardsinabox.com/campaign/campaign_school_list/?search='); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        this.schoolData = data.school_list;

        this.filteredItems = data.school_list; 
        this.loading = false;
      } catch (error) {
        this.errorMessage = 'Failed to fetch data. Please try again later.';
          this.loading = false;
      }
    },
    onSearchInput() {
      this.loading = true;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchSchools();
      }, 500); 
    },
    searchSchools() {
      this.filteredItems = this.schoolData.filter(item => 
        item.school_name.toLowerCase().includes(this.searchData.toLowerCase())
      );

      this.loading = false;
      console.log(this.filteredItems)
    },
    joinCampaignClick(itemId) {
      alert(`Viewing details for item with ID for Join Campaign: ${itemId}`);
    },
  },
};
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.custom-weight {
  font-weight: 900; 
}

.responsive-heading {
  font-size: 2.5rem; 
}

.responsive-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem !important;
  font-weight: 900 !important;
}

.imageHeight{
    max-height: 400px !important;
}

.appdownload-platform{
    display: flex;
    justify-content: center;
    gap: max(2vw,10px);
}
.appdownload-platform img{
    width: max(30vw,120px);
    max-width: 180px;
    transition: 0.5s;
    cursor: pointer;
}
.appdownload-platform img:hover{
    transform: scale(1.05);
}

.line-container {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  width: 50%; 
}

.line-container:before,
.line-container:after {
  content: "";
  flex: 1; 
  height: 1px; 
  background-color: #c4c8cb; 
  margin: 0 10px; 
}

.line-container span {
  white-space: nowrap; 
  background-color: #fff; 
  padding: 0 10px;
}

.card {
    border: 1px solid #ddd; 
}

.card-body {
  display: flex; 
  align-items: center;
  background-color: #eeefef;
  flex-wrap: wrap;
}

.item-image {
    max-width: 50px; 
    height: auto; 
    object-fit: cover; 
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
    min-width: 120px; 
}

/* Media query for smaller screens */
@media (max-width: 992px) {
  .responsive-heading {
    font-size: 2rem; 
  }

  .responsive-button {
    padding: 0.6rem 1.2rem;
    font-size: 1.1rem !important;
    font-weight: 800 !important;
  }

  .imageHeight{
    max-height: 350px !important;
    }

.line-container {
    width: 100%; 
  }
}

@media (max-width: 768px) {
  .responsive-heading {
    font-size: 1.75rem; 
    font-weight: 600; 
  }

  .responsive-button {
    padding: 0.5rem 1rem;
    font-size: 1rem !important;
    font-weight: 700 !important;
  }

  .imageHeight{
    max-height: 300px !important;
    }

    .line-container {
    width: 100%; 
  }

  .card-body {
    justify-content: center;
    text-align: center;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }
}

@media (max-width: 576px) {
  .responsive-heading {
    font-size: 1.5rem; 
    font-weight: 600;
  }

  .responsive-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem !important; 
    font-weight: 600 !important;
  }

  .imageHeight{
    max-height: 250px !important;
}

.line-container {
    width: 100%; 
  }
}

@media (max-width: 520px) {
  .responsive-heading {
    font-size: 1rem;
    font-weight: 600;
  }
  .responsive-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.825rem !important; 
    font-weight: 600 !important;
  }

  .imageHeight{
    max-height: 250px !important;
}

.line-container {
    width: 100%; 
  }
}

</style>

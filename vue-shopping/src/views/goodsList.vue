<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread>
      <span>goods</span>
    </nav-bread>

    <div class="container">
      <div class="filter-nav">
        <span class="sort-by">sort by : </span>
        <span class="sort-default">default</span>
        <span class="sort-price">price</span>
      </div>
      <div class="accessory-result">
        <div class="filter">
            <dl>
              <dt class="filter-price">Price：</dt>
              <dd>
                <span class="cur">All</span>
              </dd>
              <dd>
                <span>0-100</span>
              </dd>
              <dd>
                <span>100-500</span>
              </dd>
              <dd>
                <span>500-1000</span>
              </dd>
              <dd>
                <span>1000以上</span>
              </dd>
            </dl>
        </div>
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="item in goodsList">
                <div class="list-item">
                  <div class="pic">
                    <a href="javascript:void(0);">
                      <img class="pic-image" v-lazy="'../static/' + item.productImage" alt="" >
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salesPrice}}</div>
                    <div class="add-cart" @click="AddToCart">加入购物车</div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <div class="loadMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" >
            <img src="../assets/loading-spinning-bubbles.svg" v-show="loading">
          </div>
        </div>
      </div>
    </div>

    <modal v-show="modalShow" modalShow="modalShow" @close="CloseModal">
      <div slot="content">
        <p style="text-align: center;margin: 30px 0;">加入成功！</p>
      </div>
      <div slot="btn-group">
        <div class="btn-flex">
          <button class="btn btn-continue">继续购物</button>
          <button class="btn btn-cart">
            <router-link class="btn-cart" to="/cart">查看购物车</router-link>
          </button>
        </div>
      </div>
    </modal>


  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavBread from '../components/NavBread'
import  Modal   from  '../components/modal'

export default {
  data() {
    return {
      goodsList:[],
      loading:false,
      busy:true,
      page:1,

      modalShow:false


    }
  },
  mounted() {
    this.getGoodsList();
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods: {
    getGoodsList(flag) {
          let param = {page:this.page};
          this.loading = true;
         this.$axios.get("http://localhost:3000/users",{params:param}).then(resp => {
            if(flag){
              this.loading = false;
              this.goodsList = this.goodsList.concat(resp.data);
              this.busy = resp.data.length === 0;
            }
            else {
              this.goodsList = resp.data;
              this.busy = false;
            }

         })
      },
    loadMore() {
        setTimeout(()=>{
            this.page++;
          this.getGoodsList(true);
        },500)
    },
    AddToCart() {
        this.modalShow = true;
    },
    CloseModal() {
        this.modalShow = false;
    }
  }
}
</script>

<style scoped>
  .main {
    max-width: 1280px;
    margin: 0 auto;
  }
  .filter-nav {
    height: 60px;
    line-height: 60px;
    text-align: right;
    margin: 0 30px;
  }
  .accessory-result {
    display: flex;
  }
  .filter {
    width: 230px;
    padding: 0 20px;
  }
  .filter-price {
    font-weight: bold;
    font-size: 20px;
  }
  .pic-image {
    width: 220px;
    height: 220px;
  }

  .accessory-list >ul li:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px #e9e9e9;
  }
  .accessory-list >ul li:hover .list-item {
    border-color: #ee7a23;
  }

  .accessory-list >ul li,.accessory-list >ul li:hover {
    transition: all 0.5s ease-out;
  }


  .accessory-list-wrap {
    flex: 1;
  }
  dd {
   margin-inline-start: 0;
    margin: 20px 0;
    line-height: 1.2em;
  }
  .cur {
    color: #ee7a23;
  }

  ul:after {
    content: '';
    width: 0;
    clear: both;
    display: block;
    visibility: hidden;
    list-style-type:disc;
  }

  li {
    list-style: none;
    float: left;
    width: 23%;
    margin-right: 2%;
    margin-bottom: 2%;
    display: list-item;
  }
  .list-item {
    border: 2px solid #e9e9e9;

  }
  .pic {
    overflow: hidden;
  }
  .main {
    padding: 10px;
  }
  .main .name {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  .main .price {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .add-cart {
    border: 1px solid #d1434a;
    text-align: center;
    padding: 8px 0;
    color: #d1434a;
    cursor: pointer;
  }
  .loadMore {
    text-align: center;
  }
  .btn-flex {
    display: flex;
  }

  .btn {
    width: 50%;
    height: 40px;
    flex: 1;
    border: none;
    margin: 0 10px;
    cursor: pointer;
  }
  .btn-continue {
    background: #fff;
    border: 2px solid #d1434a;
    color: #d1434a;
  }
  .btn-cart {
    background: #d1434a;
    color: #fff;
    text-decoration: none;
  }

</style>

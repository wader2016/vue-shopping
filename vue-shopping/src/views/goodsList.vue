<template>
  <div>
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
              <li v-for="(item,index) in goodsList">
                <div class="list-item">
                  <div class="pic">
                    <a href="">
                      <img class="pic-image" v-lazy="'../static/' + item.productImage">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salesPrice}}</div>
                    <div class="add-cart">加入购物车</div>
                  </div>
                </div>
              </li>


            </ul>
          </div>

        </div>
      </div>
    </div>


    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavBread from '../components/NavBread'
export default {
  data() {
    return {
      goodsList:[]
    }
  },
  mounted() {
    this.getGoodsList();
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread
  },
  methods: {
      getGoodsList() {
         this.$axios.get("http://localhost:3000/users").then(resp => {
            console.log(resp.data);
            this.goodsList = resp.data;
         })
      }
  }
}
</script>

<style scoped>
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

</style>

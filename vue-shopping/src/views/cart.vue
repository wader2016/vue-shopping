<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>cart</span>
      </nav-bread>
      <div class="container">
        <div class="cart">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>My Cart</span></h2>
          </div>
          <div class="item-list-wrap">
            <div class="cart-item">
              <div class="cart-item-head">
                <ul>
                  <li>Items</li>
                  <li>Price</li>
                  <li>Quantity</li>
                  <li>Subtotal</li>
                  <li>Edit</li>
                </ul>
              </div>
              <ul class="cart-item-list">
                <li v-for="item in cartList">
                  <div class="cart-tab-1">
                    <div class="cart-item-check">
                      <a href="javascipt:;" class="checkbox-btn item-check-btn" >
                        <svg class="icon icon-ok">
                          <use xlink:href="#icon-ok"></use>
                        </svg>
                      </a>
                    </div>
                    <div class="cart-item-pic">
                      <img v-lazy="'/static/'+item.productImage" v-bind:alt="item.productName">
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName}}</div>
                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.salesPrice}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self select-self-open">
                        <div class="select-self-area">
                          <a class="input-sub" @click="editCart('minu',item)">-</a>
                          <span class="select-ipt">{{item.productNum}}</span>
                          <a class="input-add" @click="editCart('add',item)">+</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{(item.productNum*item.salesPrice)}}</div>
                  </div>
                  <div class="cart-tab-5">
                    <div class="cart-item-opration">
                      <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                        <svg class="icon icon-del">
                          <use xlink:href="#icon-del"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{toalPrice}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<style scoped>
  @import "../assets/css/base.css";
  @import "../assets/css/checkout.css";
  @import "../assets/css/product.css";

  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>

<script>
  import NavHeader from '../components/NavHeader'
  import NavBread from  '../components/NavBread'
    export default {
        data() {
            return {
              cartList:[]
            }
        },
      components:{
        NavBread,
        NavHeader
      },
      mounted() {
        this.getShoppingCart();
      },
      computed:{
        toalPrice() {
          let totoalPrice = 0;
          this.cartList.forEach(item =>{
            totoalPrice += parseInt(item.productNum) * parseInt(item.salesPrice);
          })
          return totoalPrice;
        }
      },
      methods:{
        getShoppingCart() {
          let param = {page:1};
          this.$axios.get("http://localhost:3000/users",{params:param}).then((res)=>{
            if(res.data.length > 0){
              Array.from(res.data,x=>{
                x.productNum = 1;
              });
              this.cartList = res.data.slice(0,4);
            }

          })
        },
        editCart(flag,item) {
          if(flag=='minu'){
            if(item.productNum > 1){
              item.productNum--;
            }
          }
          else if(flag=='add'){
            item.productNum++;
          }
        }
      }
    }
</script>

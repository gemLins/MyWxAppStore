import { Base } from '../../utils/base.js';
class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName='cart';
  }
  /*  */
  add(item,counts){
      var cartData= this.getCartDataFromLocal();
      var isHasInfo= this._isHasThatOne(item.id,cartData);
      if(isHasInfo.index==-1){
          item.counts=counts;
          item.selectStatus= true;
          cartData.push(item);
      }
      else{
        cartData[isHasInfo.index].counts+=counts;
      }
      wx.setStorageSync(this._storageKeyName, cartData)
  }
  getCartDataFromLocal(flag){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res=[];
    }
    if(flag){
      var newRes=[];
      for(let i=0;i<res.length;i++){
        if(res[i].selectStatus){
          newRes.push(res[i]);
        }
      }
      res=newRes;
    }

    return res;
  }
  _isHasThatOne(id,arr){
      var item;
      var result ={index:-1};
      for(let i = 0;i<arr.length;i++){
        item=arr[i];
        if(item.id==id){
            result={ index:i, data:item};
            break;
        }
      }
      return result;
  }
  getCartTotalCounts(flag){
    var data = this.getCartDataFromLocal();
    var counts=0;
    for(let i=0;i<data.length;i++){
      if(flag){
         if(data[i].selectStatus){
         counts+=data[i].counts;
          }
      }else{
        counts+=data[i].counts;
      }
    }
    
    return counts;
  }

  _changeCounts(id,counts){
    var cartData=this.getCartDataFromLocal();
    var hasInfo = this._isHasThatOne(id,cartData);
    if(hasInfo.index!=-1){
      if(hasInfo.data.counts>1){
        cartData[hasInfo.index].counts+=counts;
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData) ;
  }
  addCounts(id){
    this._changeCounts(id,1);
  }
  cutCounts(id){
    this._changeCounts(id,-1);
  }
  delete(ids){
    if(!(ids instanceof Array)){
      ids=[ids];
    }
    var cartData = this.getCartDataFromLocal();
    for(let i =0;i<ids.length;i++){
     
      var hasInfo=this._isHasThatOne(ids[i],cartData);
      console.log(hasInfo.index);
      if(hasInfo.index!=-1){
        cartData.splice(hasInfo.index,1);
      }
    }
    
    wx.setStorageSync(this._storageKeyName, cartData) ;
  }
  execSetStorageSysnc(data){
    wx.setStorageSync(this._storageKeyName, data);
  }

}

export { Cart }
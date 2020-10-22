
import React from 'react';
import apiCalls from '../APIcalls.js';
import { observable,action } from "mobx"

 class PostController  {

 @observable listGenus = [];

 @action  setListAction(ListGunes){
     if(ListGunes !=null)
     this.listGenus = ListGunes
 }
 


}


/*
 * Ext.ux.StoreView
 */
Ext.define("Ext.ux.StoreView",{override:"Ext.data.Store",config:{},constructor:function(){this.callParent(arguments);if(this.getViews()&&Ext.isArray(this.getViews())&&this.getViews().length>0){this.initViews()}else{this.config.views={}}this.initEvents()},initEvents:function(){this.on({addrecords:this.refreshViews,updaterecord:this.refreshViews,removerecords:this.refreshViews,refresh:this.refreshViews,scope:this})},initViews:function(){var d=0,c=this.getViews().length,b,a={};for(;d<c;d++){b=this.getViews()[d];a[b.name]=this.createView(b)}this.config.views=a},createView:function(a){Ext.apply(a,{store:Ext.create("Ext.data.Store",{model:this.getModel(),data:this.data.filterBy(a.filterFn,this,true).items}),refresh:Ext.bind(this.refreshView,this,[a.name],true)});return a},addView:function(b){var a=this.getView(b);if(a&&a.name){console.log('View with the name "'+b.name+'" already exists... overwriting.')}var c=this.createView(b);this.getViews()[c.name]=c;return c},refreshViews:function(){var b=this.getViews(),a;for(var c in b){if(b.hasOwnProperty(c)){a=b[c];this.refreshView(a)}}},refreshView:function(a){if(Ext.isString(a)){a=this.getViewData(a)}a.store.removeAll();a.store.add(this.data.filterBy(a.filterFn,this,true).items)},getActual:function(a){return this.getById(a.getId())},getViews:function(){return this.config.views},getView:function(b){var a=this.getViewData(b);return Ext.isEmpty(a)?null:a.store},getViewData:function(a){return this.getViews()[a]}});Ext.define("Ext.override.Collection",{override:"Ext.util.Collection",filterBy:function(g,j,c){var f=this,b=new this.self(),h=f.keys,e=c?f.items:f.all,a=e.length,d;b.getKey=f.getKey;for(d=0;d<a;d++){if(g.call(j||f,e[d],h[d])){b.add(h[d],e[d])}}return b}});
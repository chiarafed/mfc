sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/ui/model/Sorter",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Filter, FilterOperator, FilterType, Sorter  ) {
        "use strict";

        return Controller.extend("tileproject.tileproject.controller.dettaglio", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Routedettaglio").attachMatched(this._onObjectMatched, this);
                
            },


            _onObjectMatched: function (oEvent) {

                var sObjectId = oEvent.getParameter("arguments").selectedobj;
                this.getView().bindElement({ path: "/flussi/" + sObjectId, model: "flussiModel" });

            },
            

         onSelectionChange: function (oEvent) {
             var oList = oEvent.getSource(),
                 bSelected = oEvent.getParameter("selected");

               // skip navigation when deselecting an item in multi selection mode
                 if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                    // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                 this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());



                 }
             },
             
             _showDetail: function (oItem) {
               var id = oItem.getBindingContext("ErroriModel").getProperty("id"); //prendo l'elemento da selezionare tramite id nella master page
                console.log(id);
                this.getView().byId("detail").bindElement({ path: "/errori/" + id, model: "ErroriModel" });//lo sparo dritto nella detail page
             },
            
            //filtro searchfield
        onSearch: function (oEvt) {
            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("nome", FilterOperator.Contains, sQuery),
                new Filter("data", FilterOperator.Contains, sQuery),
            ],
                oTable = this.byId("list"),
                oBinding = oTable.getBinding("items"),
                oFilter = null;
            if (sQuery.length != 0) {
                oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
            }
            oBinding.filter(oFilter);
        },

            

            // vaiHome: function () {
            //     window.history.go(-1)
            // },

         getRouter: function() {
            return this.getOwnerComponent().getRouter();
        },
        // onUpdateFinished : function (oEvent) {
        //     // update the list object counter after new data is loaded
        //     this._updateListItemCount(oEvent.getParameter("total"));
        //     var items = this.getView().byId("list").getItems();
        //     if (items.length>0){
        //         var primoElemento = items[0];
        //         this.getView().byId("list").setSelectedItem(primoElemento, true, true);

        //     }
        // },
        // _updateListItemCount: function (iTotalItems) {
        //     var sTitle;
        //     // only update the counter if the length is final
        //     if (this._oList.getBinding("items").isLengthFinal()) {
        //         sTitle = this.getResourceBundle().getText("listTitleCount", [iTotalItems]);
        //         this.getModel("listView").setProperty("/title", sTitle);
        //     }
        // },
        // _applyFilterSearch: function () {
        //     var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),
        //         oViewModel = this.getModel("listView");
        //     this._oList.getBinding("items").filter(aFilters, "Application");
        //     // changes the noDataText of the list in case there are no filter results
        //     if (aFilters.length !== 0) {
        //         oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("listListNoDataWithFilterOrSearchText"));
        //     } else if (this._oListFilterState.aSearch.length > 0) {
        //         // only reset the no data text to default when no new search was triggered
        //         oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("listListNoDataText"));
        //     }
        // },

        vaiHome: function(){
            this.getRouter().navTo("Routetile");
        },

        goBack: function(){
            window.history.go(-1);
        },

             

        });
    });
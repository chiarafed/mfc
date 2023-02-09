sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ColumnListItem",
	"./Utils",
	"sap/ui/core/Fragment",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/ButtonType",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function(Controller, ColumnListItem, Utils, Fragment, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("tileproject.tileproject.controller.UtentiSelezionati", {

		onInit: function () {
			console.log("sono dentro l'oninit");
		},

		moveToAvailableProductsTable: function() {
			var oSelectedProductsTable = this.getView().byId("table");
			Utils.getSelectedItemContext(oSelectedProductsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				// reset the rank property and update the model to refresh the bindings
				var oProductsModel = oSelectedProductsTable.getModel();
				oProductsModel.setProperty("Rank", Utils.ranking.Initial, oSelectedItemContext);

				// select the previously selected position
				var aItemsOfSelectedProductsTable = oSelectedProductsTable.getItems();
				var oPrevItem = aItemsOfSelectedProductsTable[Math.min(iSelectedItemIndex, aItemsOfSelectedProductsTable.length - 1)];
				if (oPrevItem) {
					oPrevItem.setSelected(true);
				}
			});
		},

		onDropSelectedProductsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			var oRanking = Utils.ranking;
			var iNewRank = oRanking.Default;
			var oDroppedItem = oEvent.getParameter("droppedControl");

			if (oDroppedItem instanceof ColumnListItem) {
				// get the dropped row data
				var sDropPosition = oEvent.getParameter("dropPosition");
				var oDroppedItemContext = oDroppedItem.getBindingContext();
				var iDroppedItemRank = oDroppedItemContext.getProperty("Rank");
				var oDroppedTable = oDroppedItem.getParent();
				var iDroppedItemIndex = oDroppedTable.indexOfItem(oDroppedItem);

				// find the new index of the dragged row depending on the drop position
				var iNewItemIndex = iDroppedItemIndex + (sDropPosition === "After" ? 1 : -1);
				var oNewItem = oDroppedTable.getItems()[iNewItemIndex];
				if (!oNewItem) {
					// dropped before the first row or after the last row
					iNewRank = oRanking[sDropPosition](iDroppedItemRank);
				} else {
					// dropped between first and the last row
					var oNewItemContext = oNewItem.getBindingContext();
					iNewRank = oRanking.Between(iDroppedItemRank, oNewItemContext.getProperty("Rank"));
				}
			}

			// set the rank property and update the model to refresh the bindings
			var oSelectedProductsTable = this.getView().byId("table");
			var oProductsModel = oSelectedProductsTable.getModel();
			oProductsModel.setProperty("Rank", iNewRank, oDraggedItemContext);
		},

		moveSelectedItem: function(sDirection) {
			var oSelectedProductsTable = this.getView().byId("table");
			Utils.getSelectedItemContext(oSelectedProductsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				var iSiblingItemIndex = iSelectedItemIndex + (sDirection === "Up" ? -1 : 1);
				var oSiblingItem = oSelectedProductsTable.getItems()[iSiblingItemIndex];
				var oSiblingItemContext = oSiblingItem.getBindingContext();
				if (!oSiblingItemContext) {
					return;
				}

				// swap the selected and the siblings rank
				var oProductsModel = oSelectedProductsTable.getModel();
				var iSiblingItemRank = oSiblingItemContext.getProperty("Rank");
				var iSelectedItemRank = oSelectedItemContext.getProperty("Rank");

				oProductsModel.setProperty("Rank", iSiblingItemRank, oSelectedItemContext);
				oProductsModel.setProperty("Rank", iSelectedItemRank, oSiblingItemContext);

				// after move select the sibling
				oSelectedProductsTable.getItems()[iSiblingItemIndex].setSelected(true).focus();
			});
		},

		moveUp: function(oEvent) {
			this.moveSelectedItem("Up");
			oEvent.getSource().focus();
		},

		moveDown: function(oEvent) {
			this.moveSelectedItem("Down");
			oEvent.getSource().focus();
		},

		onBeforeOpenContextMenu: function(oEvent) {
			oEvent.getParameters().listItem.setSelected(true);
		},

		aggFlusso: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("AnagFlussi")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "tileproject.tileproject.view.AnagFlussi",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("AnagFlussi").open();
			}
			
		},
		onCloseDialog: function() {
			this.byId("AnagFlussi").close();},
		
		

			//zona menù flussi 

		aggDialog: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("mySelectDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "tileproject.tileproject.view.Dialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("mySelectDialog").open();
			}
			
		},
		onCloseDialogFlussi: function() {
			
			this.byId("mySelectDialog").close();},
		
		// onSearchFlussi: function (oEvent) {
		// 	var sValue = oEvent.getParameter("value");
		// 	var oFilter = new Filter("nome", FilterOperator.Contains, sValue);
		// 	var oBinding = oEvent.getParameter("value");
		// 	oBinding.filter([oFilter]);
		// },
		
		// apriQualcosa: function (oEvent){
		// 	var smart = new sap.ui.comp.smarttable.SmartTable("mainsmarttable", settingsTable);
		// 	smart._oTable.insertColumn(new sap.ui.table.Column({ resizable: true, autoResizable: true, label: new sap.m.Label({ text: "Vtext", design: "Bold" }), template: new SmartField({ value: { path: "Vtext" }, editable: false }) }));
		// }
	});

	

});
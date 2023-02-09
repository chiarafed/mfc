sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./Utils",
	"sap/ui/core/Fragment",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/ButtonType"
], function(Controller, Utils, Fragment, Button, Dialog, ButtonType) {
	"use strict";

	return Controller.extend("tileproject.tileproject.controller.Utenti", {

		onDropAvailableProductsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			// reset the rank property and update the model to refresh the bindings
			var oAvailableProductsTable = this.getView().byId("table");
			var oProductsModel = oAvailableProductsTable.getModel();
			oProductsModel.setProperty("Rank", Utils.ranking.Initial, oDraggedItemContext);
		},

		moveToSelectedProductsTable: function() {
			var oAvailableProductsTable = this.getView().byId("table");
			Utils.getSelectedItemContext(oAvailableProductsTable, function(oAvailableItemContext, iAvailableItemIndex) {
				var oSelectedProductsTable = this.getView().byId("table");
				var oFirstItemOfSelectedProductsTable = oSelectedProductsTable.getItems()[0];
				var iNewRank = Utils.ranking.Default;

				if (oFirstItemOfSelectedProductsTable) {
					var oFirstContextOfSelectedProductsTable = oFirstItemOfSelectedProductsTable.getBindingContext();
					iNewRank =  Utils.ranking.Before(oFirstContextOfSelectedProductsTable.getProperty("Rank"));
				}

				var oProductsModel = oAvailableProductsTable.getModel();
				oProductsModel.setProperty("Rank", iNewRank, oAvailableItemContext);

				// select the inserted and previously selected item
				oSelectedProductsTable.getItems()[0].setSelected(true);
				var oPrevSelectedItem = oAvailableProductsTable.getItems()[iAvailableItemIndex];
				if (oPrevSelectedItem) {
					oPrevSelectedItem.setSelected(true);
				}
			}.bind(this));
		},

		onBeforeOpenContextMenu: function(oEvent) {
			oEvent.getParameter("listItem").setSelected(true);
		},

		aggUtente: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("AnagUtenti")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "tileproject.tileproject.view.AnagUtenti",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("AnagUtenti").open();
			}
			
		},
		onCloseDialog: function() {
			this.byId("AnagUtenti").close();}



			
	});

});
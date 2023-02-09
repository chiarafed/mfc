sap.ui.define([
    'sap/ui/core/message/ControlMessageProcessor',
    'sap/ui/core/message/Message',
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/library',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    'sap/m/MessageToast',
    "sap/ui/core/Core",
    "./Utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/core/UIComponent"
], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, UIComponent) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    var PageController = Controller.extend("tileproject.tileproject.controller.tile", {

        onInit: function () {
            // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
            // this.getView().setModel(oModel);


            var oMessageProcessor = new ControlMessageProcessor();
            var oMessageManager = oCore.getMessageManager();

            oMessageManager.registerMessageProcessor(oMessageProcessor);

            oMessageManager.addMessages(
                new Message({
                    message: "Something wrong happened",
                    type: MessageType.Error,
                    processor: oMessageProcessor
                }),

              
            );



        },
        
        getRouter: function () {
            return UIComponent.getRouterFor(this);

        },
        add: function() {
            var msg = 'Utente salvato correttamente';
			MessageToast.show(msg);
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
          },



        refresh: function () {
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
        },

        exit: function(){
            var msg = 'Utente salvato correttamente';
			MessageToast.show(msg);
            this.getRouter().navTo("RouteAnagUtenti");
          },
        
        

          vaiHome: function(){
            this.getRouter().navTo("Routetile");
        },

        goBack: function(){
            window.history.go(-1);
        },
       

       

    });


    return PageController;

});
/*
License: GPL as per: http://www.gnu.org/copyleft/gpl.html
$Id$
*/

// Ensure this object's dependancies are loaded.
mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");

/**
 * Base class for tools which update GML by clicking on the mapPane.
 * @constructor
 * @base ButtonBase
 * @author Cameron Shorter cameronATshorter.net
 * @param button        Pointer to the button instance being created.
 * @param toolNode      The tool node from the Config XML file.
 * @param model  The ButtonBar widget.
 */
function EditButtonBase(button,toolNode, model) {
  // Extend ButtonBase
  var base = new ButtonBase(button, toolNode, model);

  /** Empty GML to load when this tool is selected. */
  this.defaultModelUrl=toolNode.selectSingleNode("mb:defaultModelUrl").firstChild.nodeValue;

  /** Reference to GML node to update when a feature is added. */
  this.featureXpath=toolNode.selectSingleNode("mb:featureXpath").firstChild.nodeValue;

  /**
   * If tool is selected and the Edit Tool has changed (eg, changed from
   * LineEdit to PointEdit) then load new default feature.
   * This function is called when a tool is selected or deselected.
   * @param objRef Pointer to this object.
   * @param selected True when selected.
   */
  this.doSelect = function(selected,objRef) {
    if (objRef.enabled && selected && objRef.targetModel.url!=objRef.defaultModelUrl){
      objRef.targetModel.url=objRef.defaultModelUrl;
      // load default GML
      var httpPayload=new Object();
      httpPayload.url=objRef.defaultModelUrl;
      httpPayload.method="get";
      httpPayload.postData=null;
      objRef.targetModel.setParam('httpPayload',httpPayload);
    }
  }

  /**
   * Register for mouseup events, called after model loads.
   * @param objRef Pointer to this object.
   */
  this.setMouseListener = function(objRef) {
    if (objRef.mouseHandler) {
      objRef.mouseHandler.model.addListener('mouseup',objRef.doAction,objRef);
    }
  }

  // If this object is being created because a child is extending this object,
  // then child.properties = this.properties
  for (sProperty in this) {
    button[sProperty] = this[sProperty];
  }

  button.targetModel.addListener("loadModel",button.setMouseListener,button);
}
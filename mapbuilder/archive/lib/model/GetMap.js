/*
Author:       Mike Adair  mike.adairATccrs.nrcan.gc.ca
License:      LGPL as per: http://www.gnu.org/copyleft/lesser.html

$Id$
*/

/**
 * Model which represents the results of a GetMap request.  In this case the 
 * mime type of the model document is probably be an image type.
 * tbd: this still needed?
 * @constructor
 * @base ModelBase
 * @param modelNode  The model's XML object node from the configuration document.
 * @param parent The model object that this model belongs to.
 */
function GetMap(modelNode, parent) {
  // Inherit the ModelBase functions and parameters
  ModelBase.apply(this, new Array(modelNode, parent));
  this.namespace = "xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";

  this.prePaint = function(objRef) {
    objRef.stylesheet.setParameter("width", objRef.containerModel.getWindowWidth() );
    objRef.stylesheet.setParameter("height", objRef.containerModel.getWindowHeight() );
    bBox=objRef.containerModel.getBoundingBox();
    var bboxStr = bBox[0]+","+bBox[1]+","+bBox[2]+","+bBox[3];
    objRef.stylesheet.setParameter("bbox", bboxStr );
    objRef.stylesheet.setParameter("srs", objRef.containerModel.getSRS() );
    objRef.stylesheet.setParameter("version", objRef.model.getVersion(objRef.featureNode) );
    objRef.stylesheet.setParameter("baseUrl", objRef.model.getServerUrl("GetMap") );
    objRef.stylesheet.setParameter("mbId", objRef.featureNode.getAttribute("id") );
    objRef.resultDoc = objRef.featureNode;
  }

  /**
   * 
   * @param objRef Pointer to this object.
   */
  this.loadLayer = function(objRef, feature) {
    objRef.featureNode = feature;
    objRef.paint(objRef);
  }
  this.addListener("GetMap", this.loadLayer, this);

}


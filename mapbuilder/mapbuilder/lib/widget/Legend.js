/*
License: GPL as per: http://www.gnu.org/copyleft/gpl.html
$Id$
*/

/**
 * Functions to render and update a Legend from a Web Map Context.
 * @constructor
 * @author Cameron Shorter cameronATshorter.net
 * @constructor
 * @requires Sarissa, Util, Context
 * @param context The Web Map Context which contains the state of this legend.
 * @param baseDir The base mapbuilder lib directory.
 * @param node Node from the HTML DOM to insert legend HTML into.
 */
function Legend(context,baseDir) {
  this.context=context;
  var node=makeElt("DIV");
  node.style.position="absolute";
  node.style.overflow="auto";
  this.node=node;
  this.context2Legend=new XslProcessor(baseDir+"/legend/Context2Legend.xml");

  this.move=function(left,top) {
    this.node.style.left=left;
    this.node.style.top=top;
  }
  this.resize=function(width,height) {
    this.node.style.width=width;
    this.node.style.height=height;
  }
  /**
   * Render the legend.
   * This function should be called at startup.
   */
  this.paint=function(){
    s=this.context2Legend.transformNode(this.context.context);
    this.node.innerHTML=s;
  }

  /**
   * Called when the context's hidden attribute changes.
   * @param e The event sent to the listener.
   */
  this.hiddenListener=function(e){
    // TBD check/uncheck Layer's selected box
  }

  this.context.addHiddenListener(this.hiddenListener);
}

// JavaScript Document
////////////////////////////////////////////////////////////////////////////////
//Title: Click_Command												  		  //
//By: Patrick Teague														  //
//Date: 5/15/2012															  //
//This class is the parent class for all possible operations that may be run  //
//on an object, such as a node.												  //
////////////////////////////////////////////////////////////////////////////////
var Click_Command = new Class({
	initialize: function(){
		this.circle_inner_radius = 20;
		this.circle_outer_radius = 55;
	},
	draw: function(cx, cy, tot_el, this_el){
		var this_theta = (2*Math.PI/tot_el)*(this_el);
		if(tot_el === 1)
			this_theta -= Math.PI/2;
		var start_theta = this_theta + (Math.PI/tot_el); //Half the angle element exists in
		var end_theta = this_theta - (Math.PI/tot_el);
		
		if(tot_el === 2){
			start_theta -= Math.PI/20;
			end_theta += Math.PI/20;
		}
		else if(tot_el != 1){
			start_theta -= Math.PI/(5*tot_el);
			end_theta += Math.PI/(5*tot_el);
		}
		var start_x_in = cx + this.circle_inner_radius*Math.cos(start_theta);
		var start_y_in = cy + this.circle_inner_radius*Math.sin(start_theta);
		var end_x_in = cx + this.circle_inner_radius*Math.cos(end_theta);
		var end_y_in = cy + this.circle_inner_radius*Math.sin(end_theta);
		
		var start_x_out = cx + this.circle_outer_radius*Math.cos(start_theta);
		var start_y_out = cy + this.circle_outer_radius*Math.sin(start_theta);
		var end_x_out = cx + this.circle_outer_radius*Math.cos(end_theta);
		var end_y_out = cy + this.circle_outer_radius*Math.sin(end_theta);
		
		var text_x = cx + ((this.circle_inner_radius+this.circle_outer_radius)/2)*Math.cos(this_theta);
		var text_y = cy + ((this.circle_inner_radius+this.circle_outer_radius)/2)*Math.sin(this_theta);
		var text_rot = (this_theta*180/Math.PI) + 90;
		var large_arc_flag = 0;
		var sweep_flag = 0;
		var inver_sweep_flag = 1;
		var inver_large_arc_flag = 1;
		if(Math.abs(start_theta - end_theta) > Math.PI){
			console.log("large arc sweep flag changed");
			//large_arc_flag = 1;
			//sweep_flag = 1;
			//inver_sweep_flag = 0;
			//inver_large_arc_flag = 0;
			console.log("Inner: Start: "+start_x_in, start_y_in+" End: "+end_x_in, end_y_in);
			console.log("Outer: Start: "+start_x_out, start_y_out+" End: "+end_x_out, end_y_out);
			this.test_arc = paper.path(["M", start_x_in, start_y_in,
			"L", start_x_out, start_y_out,
			"A", this.circle_outer_radius, this.circle_outer_radius, 0, +(end_theta - start_theta > Math.PI), 1, end_x_out, end_y_out, 
			"L", end_x_in, end_y_in,
			"A", this.circle_inner_radius, this.circle_inner_radius, 0,+(end_theta - start_theta > Math.PI), 0, start_x_in, start_y_in,
			"Z"
			]);
			//this.test_arc = paper.path('M'+end_x_in+','+end_y_in+'A'+this.circle_inner_radius+','+this.circle_inner_radius+',0,'+large_arc_flag+','+sweep_flag+','+start_x_in+','+start_y_in+'L'+start_x_out+','+start_y_out+'A'+this.circle_outer_radius+','+this.circle_outer_radius+',0,'+large_arc_flag+','+inver_sweep_flag+','+end_x_out+','+end_y_out+'Z');
		this.test_arc.attr({fill: '#000000', stroke: '#000000', 'fill-opacity': .7, cursor: 'pointer'});
		}
		this.bottom_arc = paper.path('M'+start_x_in+','+start_y_in+'A'+this.circle_inner_radius+','+this.circle_inner_radius+',0,'+large_arc_flag+','+sweep_flag+','+end_x_in+','+end_y_in+'L'+end_x_out+','+end_y_out+'A'+this.circle_outer_radius+','+this.circle_outer_radius+',0,'+large_arc_flag+','+inver_sweep_flag+','+start_x_out+','+start_y_out+'Z');
		this.bottom_arc.attr({fill: '#000000', stroke: 'none', 'fill-opacity': .7, cursor: 'pointer'});
		this.top_text = paper.text(text_x,text_y,"TXT");
		this.top_text.attr({fill: '#FFFFFF', font: 'Myriad Pro', 'font-size': 15});
		this.top_text.transform('r'+text_rot);
		this.top_arc = paper.path('M'+start_x_in+','+start_y_in+'A'+this.circle_inner_radius+','+this.circle_inner_radius+',0,0,0,'+end_x_in+','+end_y_in+'L'+end_x_out+','+end_y_out+'A'+this.circle_outer_radius+','+this.circle_outer_radius+',0,0,1,'+start_x_out+','+start_y_out+'Z');
		this.top_arc.attr({fill: '#000000', stroke: 'none', 'fill-opacity': 0, cursor: 'pointer'});
		this.addListeners();
	},
	undraw: function(){
		this.top_arc.unmouseover();
		this.top_arc.unmouseout();
		this.top_arc.remove();
		this.top_text.remove();
		this.bottom_arc.remove();
	},
	addListeners: function(){
		var b = this;
		var arc_over = function(e){
			b.bottom_arc.attr({'fill-opacity': .2});
		};
		var arc_out = function(e){
			b.bottom_arc.attr({'fill-opacity': .7});
		};
		this.top_arc.mouseover(arc_over);		
		this.top_arc.mouseout(arc_out);	
	},
	point_in: function(test_x, test_y){
		if(this.top_arc.isPointInside(test_x, test_y)){
			return true;
		}
		else if(this.bottom_arc.isPointInside(test_x, test_y)){
			return true;	
		}
		return false;	
	}
});
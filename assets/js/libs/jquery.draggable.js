// Simple JQuery Draggable Plugin
// https://plus.google.com/108949996304093815163/about
// Usage: $(selector).draggable();
// Options:
// handle            => your dragging handle.
//                      If not defined, then the whole body of the
//                      selected element will be draggable
// draggableClass    => define the draggable class
// activeHandleClass => define the active handle class
//

(function ($) {
	$.fn.draggable = function (opt) {
		opt = $.extend({
			parent: true,
			handle: "",
			draggableClass: "dragged",
			activeHandleClass: "active-handle"
		}, opt);

		var $selected = null;
		var $elements = (opt.handle === "") ? this : this.find(opt.handle);

		$elements.on("mousedown", function (e) {
			if (opt.handle === "") {
				$selected = $(this);
				$selected.addClass(opt.draggableClass);
			} else {
				$selected = $(this).parent();
				$selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
			}
			var $parent = $selected.parent();
			var drg_h = $selected.outerHeight(),
				drg_w = $selected.outerWidth(),
				pos_y = $selected.offset().top + drg_h - e.pageY,
				pos_x = $selected.offset().left + drg_w - e.pageX,
				p_drg_h = $parent.outerHeight(),
				p_drg_w = $parent.outerWidth(),
				p_pos_y1 = $parent.offset().top + 5,
				p_pos_x1 = $parent.offset().left + 5,
				p_pos_y2 = $parent.offset().top + p_drg_h - drg_h - 5,
				p_pos_x2 = $parent.offset().left + p_drg_w - drg_w - 5;

			$(document).on("mousemove", function (e) {
				if (!parent) {
					$selected.offset({
						top: e.pageY + pos_y - drg_h,
						left: e.pageX + pos_x - drg_w
					});
				} else {
					var new_pos_y = e.pageY + pos_y - drg_h,
						new_pos_x = e.pageX + pos_x - drg_w,
						max_pos_y = new_pos_y >= p_pos_y2 ? p_pos_y2 : new_pos_y,
						max_pos_x = new_pos_x >= p_pos_x2 ? p_pos_x2 : new_pos_x,
						end_pos_y = max_pos_y <= p_pos_y1 ? p_pos_y1 : max_pos_y,
						end_pos_x = max_pos_x <= p_pos_x1 ? p_pos_x1 : max_pos_x;

					$selected.offset({
						top: end_pos_y,
						left: end_pos_x
					});
				}
			}).on("mouseup", function () {
				$(this).off("mousemove"); // Unbind events from document
				if ($selected !== null) {
					$selected.removeClass(opt.draggableClass);
					$selected = null;
				}
			});
			e.preventDefault(); // disable selection
			e.stopPropagation();
		}).on("mouseup", function () {
			if (opt.handle === "") {
				$selected.removeClass(opt.draggableClass);
			} else {
				$selected.removeClass(opt.draggableClass)
					.find(opt.handle).removeClass(opt.activeHandleClass);
			}
			$selected = null;
		});
		return this;
	};
})(jQuery);

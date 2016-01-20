$(function() {
$("#sel1").selectable( {
    autoRefresh: false,
    stop: function() {
        var count = 0;
        $( '.ui-selected', this).each(function() {
            count++;
        });
        $('#tab1').html('Div 1 (' + count + ')');
    }
});
$("#sel2").selectable( {
    autoRefresh: false,
    stop: function() {
        var count = 0;
        $( '.ui-selected', this).each(function() {
            count++;
        });
        $('#tab2').html('Div 2 (' + count + ')');
    }
});
$("#tabs").tabs();
});
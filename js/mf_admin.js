(function($) {
    $(document).ready(function() {
        /******************************** SORTABLE CATEGORIES ********************************/

        //Make Categories Sortable
        $('#sortable-categories').sortable({
            placeholder: "ui-state-highlight",
            start: function() {
                $('div.user-groups-area').hide();
            }
        });
        $('a.access_control').click(function() {
            id = $(this).attr('data-value');
            $('div#user-groups-' + id).toggle();
            return false;
        });

        $('a#mf_add_new_category').click(function() {
            $('#hidden-element-container li').clone().appendTo('ol#sortable-categories');
            return false;
        });
        $('body').on('click', '.mf_remove_category', function() {
            var answer = confirm(MFAdmin.remove_category_warning);
            if(answer) {
                $(this).parent().remove();
            }
            return false;
        });
/******************************** SORTABLE FORUMS ********************************/
    //Make Forums Sortable
    $('.sortable_forums').each(function() {
      $(this).sortable({
        placeholder: "ui-state-highlight"
      });
    });

    //Add New Forum Button
    $('.mf_add_new_forum').click(function() {
      var category_id = $(this).attr('data-value');
      var new_forum_row = get_new_forum_row(category_id);

      $(new_forum_row).hide().appendTo('ol#sortable-forums-' + category_id).fadeIn(500);

      return false;
    });

    function get_new_forum_row(category_id) {
      var random_id = Math.floor(Math.random() * (1000000 - 100000)) + 100000;

      return '<li class="ui-state-active">\
                <input type="hidden" name="mf_forum_id[' + category_id + '][]" value="new" />\
                &nbsp;&nbsp;\
                <label for="forum-name-' + random_id + '">' + MFAdmin.forum_name_label + '</label>\
                <input type="text" name="forum_name[' + category_id + '][]" id="forum-name-' + random_id + '" value="" />\
                &nbsp;&nbsp;\
                <label for="forum-description-' + random_id + '">' + MFAdmin.forum_description_label + '</label>\
                <input type="text" name="forum_description[' + category_id + '][]" id="forum-description-' + random_id + '" value="" size="50" />\
                <a href="#" class="mf_remove_forum" title="' + MFAdmin.remove_forum_a_title + '">\
                  <img src="' + MFAdmin.images_url + 'remove.png" width="24" />\
                </a>\
              </li>';
    }

    //Delete a Forum
    $('body').on('click', '.mf_remove_forum', function() {
      var answer = confirm(MFAdmin.remove_forum_warning);

      if(answer) {
        $(this).parent().fadeOut(500, function() {
          $(this).remove();
        });
      }

      return false;
    });

    /******************************** USER GROUPS STUFF *******************************/
    $('a#mf_add_new_user_group').click(function() {
        $('#hidden-element-container li').clone().appendTo('ol#user-groups');
        return false;
    });
    $('body').on('click', '.mf_remove_user_group', function() {
        var answer = confirm(MFAdmin.remove_user_group_warning);
        if(answer) {
            $(this).parent().remove();
        }
        return false;
    });
});
})(jQuery);

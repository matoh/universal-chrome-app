/**
 * Created by Mato on 13. 2. 2016.
 */
$(document).ready( function() {

    var postSettings = {
        hideFriendsMultiple : 0,
        hideFriendsPages : 0,
        hideFriendsPosts : 0,
        hideOrFade : 0
    };

    chrome.storage.sync.get( null, function(items) {

        $.each(items, function(key, value){
            postSettings[key] = value;
        });

        if((postSettings.hideFriendsPages !== 0) && (postSettings.hideFriendsPages !== 0) || (postSettings.hideFriendsPosts !== 0)) {
            postRemover.initEvents();
        }

    });

    var postRemover = {

        btnPageSelector  : '.uiLikePageButton',
        btnFriendSelector: '.FriendRequestAdd',

        postTargetName     : '_4-u2',
        postTargetSelector : '._4-u2',
        feedStreamSelector : '._5pcb',

        friendsOfFriendsLikeSelector: '._1qbu',
        multipleFriendsPostsSelector: '.fwn.fcg .fcg .fwb',

        initEvents: function() {

            console.log('initEvents');
            
            postRemover.checkExistingPosts();
            postRemover.bindDomNodeInserted();

        },

        checkExistingPosts : function() {

            $.each( $( this.postTargetSelector), function() {

                postRemover.removeFriendsOfFriendsPosts();
                postRemover.removePagesOfFriends();

                postRemover.removeMultipleFriendsPosts();

            });

        },

        bindDomNodeInserted : function() {

            $('body').on('DOMNodeInserted', this.feedStreamSelector, {name: this.postTargetName}, function(e) {

                if (e.target.classList.contains(e.data.name)) {

                    postRemover.removeFriendsOfFriendsPosts();
                    postRemover.removePagesOfFriends();

                    postRemover.removeMultipleFriendsPosts();

                }

            });

        },

        removeFriendsOfFriendsPosts : function() {
            if(postSettings.hideFriendsPosts === 1) {
                postRemover.hidePostElement(this.btnFriendSelector);
            }
        },

        removeMultipleFriendsPosts : function() {

            if(postSettings.hideFriendsMultiple === 0) { return false; }

            /* Check if existing friend of friends posts */
            if ($(this.postTargetSelector).find(this.friendsOfFriendsLikeSelector).length == 0) {
                return false;
            }

            var selector = this.postTargetSelector + ' ' + this.multipleFriendsPostsSelector;

            /* Check if existing multiple links with friends of friends posts */
            if ($(selector).find('a').length > 1) {
                this.hidePostElement(selector);
            }
        },

        removePagesOfFriends : function() {
            if(postSettings.hideFriendsPages === 1) {
                postRemover.hidePostElement(this.btnPageSelector);
            }
        },

        hidePostElement: function(selector){
            if(postSettings.hideOrFade == 1) {
                $(selector).closest(this.postTargetSelector).hide();
            } else {
                $(selector).closest(this.postTargetSelector).css('opacity', '0.5');
            }
        }

    };

});

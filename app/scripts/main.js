(function (root, $) {

    var imageStream = root.imageStream ? root.imageStream : {};

    imageStream = {

        reload: function () {
            if (window.ajaxWorking === true) {
                return;
            }

            if (this.postsList) {
                return;
            }

            this.render_posts();
        },

        render_posts: function () {
            var self = this;
            var url = appConfig.apiHost + '/api/posts';
            console.log("rendering: " + url);
            $.get(url, function (data) {
                self.postsList = data['posts'];
                var html = [];

                $(self.postsList).each(function (index, _item) {
                    html.push('<tr><td>' + _item.title + '<br/>');
                    html.push('<img src="' +  _item.imageUrl + '" class="img-responsive" alt="Responsive image">');
                    html.push('</td></tr>');
                });

                html = html.join('');
                $('.post-list').html(html);
            });
        },

        render_postCount: function() {
            var self = this;
            var url =  appConfig.apiHost +  'api/posts/count';

            $.get(url, function (data) {
                var html = [];
                $(data).each(function (index, _item) {
                    console.log(_item);
                    html.push('<li class="active"><a href="#">Posts: ' + _item.posts + '</a></li>');
                });

                html = html.join('');
                $('.navbar-nav').append(html);
            });

            var viewsUrl =  appConfig.apiHost +  '/api/posts/views';

            $.get(viewsUrl, function (data) {
                var html = [];
                $(data).each(function (index, _item) {
                    console.log(_item);
                    html.push('<li class="active"><a href="#">Views: ' + _item.views + '</a></li>');
                });

                html = html.join('');
                $('.navbar-nav').append(html);
            });
        },

        init: function () {
            this.render_postCount();
            this.render_posts();
            //this.binding_actions();

            var self = this;
            setInterval(function () {
                self.reload();
            }, 15000);
        }
    };

    imageStream.init();

})(window, jQuery);

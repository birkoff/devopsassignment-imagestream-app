(function (root, $) {

    var imageStream = root.imageStream ? root.imageStream : {};

    imageStream = {

        render_posts: function () {
            var self = this;
            var url = appConfig.apiHost + '/api/posts';
            console.log('rendering: ' + url);

            $.get(url, function (data) {
                console.log("requested post");
                self.postsList = data['posts'];
                var html = [];

                $(self.postsList).each(function (index, _item) {

                    if(!(/^http:\/\//.test(_item.imageUrl))) {
                        _item.imageUrl = appConfig.apiHost + "/" + _item.imageUrl;
                    }

                    html.push('<tr><td>' + _item.title + '<br/>');
                    html.push('<img src="' +  _item.imageUrl + '" class="img-responsive" alt="Responsive image">');
                    html.push('</td></tr>');
                });

                html = html.join('');
                $('.post-list').html(html);
            });

            console.log("init");

        },

        render_postCount: function() {
            var self = this;

            var viewsUrl =  appConfig.apiHost +  '/api/posts/count';

            $.get(viewsUrl, function (data) {
                var html = [];
                $(data).each(function (index, _item) {
                    console.log(_item);
                    html.push('<li class="active"><a href="#">Posts: ' + _item.posts + '</a></li>');
                });
                html = html.join('');
                console.log(html);
                $('#postcount').replaceWith(html);
            });

            var viewsUrl =  appConfig.apiHost +  '/api/posts/views';

            $.get(viewsUrl, function (data) {
                var html = [];
                $(data).each(function (index, _item) {
                    console.log(_item);
                    html.push('<li id="views" class="active"><a href="#">Views: ' + _item.views + '</a></li>');
                });
                html = html.join('');
                console.log(html);
                $('#views').replaceWith(html);
            });
        },

        binding_actions: function() {
            $("#uploadimage").on('submit',(function(e) {
                var actionUrl = appConfig.apiHost + '/api/post/create';
                console.log(actionUrl);
                $("#uploadimage").attr('action', actionUrl);

                console.log("starting");
            }));
        },

        init: function () {
            this.render_postCount();
            this.render_posts();
            this.binding_actions();

            // var self = this;
            // setInterval(function () {
            //     self.reload();
            // }, 15000);
        }
    };

    imageStream.init();

})(window, jQuery);

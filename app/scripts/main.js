(function (root, $) {

    var imageStream = root.imageStream ? root.imageStream : {};

    imageStream = {

        // reload: function () {
        //     if (window.ajaxWorking === true) {
        //         return;
        //     }
        //
        //     if (this.postsList) {
        //         return;
        //     }
        //
        //     this.render_posts();
        // },

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
                        _item.imageUrl = "http://hector.dev:8000/" + _item.imageUrl;
                    }

                    html.push('<tr><td>' + _item.title + '<br/>');
                    html.push('<img src="' +  _item.imageUrl + '" class="img-responsive" alt="Responsive image">');
                    html.push('</td></tr>');
                });

                html = html.join('');
                $('.post-list').html(html);
            });

            console.log("init");

            // // Variable to store your files
            // var files;
            //
            // $('input[type=file]').on('change', function(e) {
            //     files = e.target.files;
            // });
            //
            // $("#uploadimage").on('submit',(function(e) {
            //     console.log("starting upload");
            //
            //     e.stopPropagation(); // Stop stuff happening
            //     e.preventDefault(); // Totally stop stuff happening
            //
            //     var data = new FormData();
            //     $.each(files, function (key, value) {
            //         data.append('upload', value);
            //     });
            //
            //     $.ajax({
            //         url: "http://hector.dev:8000/api/post/create",
            //         method: "POST",
            //         data: data,
            //         cache: false,
            //         dataType: 'json',
            //         processData: false, // Don't process the files
            //         contentType: false, // Set content type to false as jQuery will tell the server its a query string request});
            //         success: function (data, textStatus, jqXHR) {
            //             if (typeof data.error === 'undefined') {
            //                 // Success so call function to process the form
            //                 submitForm(event, data);
            //             }
            //             else {
            //                 // Handle errors here
            //                 console.log('ERRORS: ' + data.error);
            //             }
            //         },
            //         error: function (jqXHR, textStatus, errorThrown) {
            //             // Handle errors here
            //             console.log('ERRORS: ' + textStatus);
            //             // STOP LOADING SPINNER
            //         }
            //    });
            //}));

                // $("#uploadimage").on('submit',(function(e) {
            //     console.log("starting");
            //     e.preventDefault();
            //     $.ajax({
            //         url: "https://s3-eu-west-1.amazonaws.com/hectors-lambda-test-ppictures/test_data.txt?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIVPAJVKPK6PCHD2Q%2F20161115%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20161115T194814Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=9c9910cfb37be7a4fde1bbed27ef0bd6cc142bcd004743fc46cc32e1eb6606f0", // Url to which the request is send
            //         headers: {
            //             'Pragma':'no-cache',
            //             'Cache-Control':'no-store, no-cache, must-revalidate',
            //             'X-Content-Type-Options':'nosniff',
            //             'Access-Control-Allow-Origin':'*',
            //             'Access-Control-Allow-Methods':'PUT, POST'
            //         },
            //         type: "PUT",             // Type of request to be send, called as method
            //         data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            //         contentType: false,       // The content type used when sending data to the server.
            //         cache: false,             // To unable request pages to be cached
            //         processData:false,        // To send DOMDocument or non processed data file it is set to false
            //         success: function(data)   // A function to be called if request succeeds
            //         {
            //             console.log("done");
            //         }
            //     });
            // }));

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
                    html.push('<li class="active"><a href="#">Views: ' + _item.views + '</a></li>');
                });
                html = html.join('');
                console.log(html);
                $('#views').replaceWith(html);
            });
        },

        init: function () {
            this.render_postCount();
            this.render_posts();
            //this.binding_actions();

            // var self = this;
            // setInterval(function () {
            //     self.reload();
            // }, 15000);
        }
    };

    imageStream.init();

})(window, jQuery);

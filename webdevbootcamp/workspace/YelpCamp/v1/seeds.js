var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Campground #1",
        image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisi sit amet nulla gravida lacinia. Nullam a eros et erat tempus molestie id ut libero. Pellentesque scelerisque leo turpis, sit amet aliquet arcu volutpat non. Maecenas tempus posuere nisi, nec efficitur justo dictum ut. Maecenas volutpat posuere enim. Sed lacinia tellus ac gravida ultricies. Sed facilisis consequat sem, non ultricies lectus consequat et. Maecenas pretium finibus tortor in ultrices. Nullam velit ipsum, ultrices eu dictum nec, efficitur a eros. Aliquam erat volutpat. Nulla neque est, rhoncus pellentesque suscipit ut, ullamcorper eget justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vel fermentum dui. Ut laoreet commodo velit ut convallis. Donec malesuada enim ut elit pulvinar pharetra. Aenean rutrum, nisi sit amet mollis aliquet, sem tortor sagittis ante, ut commodo tellus purus et elit. Integer augue mi, vehicula nec consequat sed, aliquet eu tellus. Nulla vitae sapien tortor. Aliquam et eleifend nisl, eget maximus nisl. Vestibulum quis iaculis dui, ut finibus leo. Etiam euismod luctus mi, a iaculis ipsum aliquam ac. Cras facilisis, ex ut interdum aliquet, tortor nulla commodo arcu, sed auctor libero risus in ligula. In rutrum erat ac eros dapibus, a pretium eros ultricies. Suspendisse non pretium nisl."
    },
    {
        name: "Campground #2",
        image: "https://acadiamagic.com/940x366/campground-1301.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisi sit amet nulla gravida lacinia. Nullam a eros et erat tempus molestie id ut libero. Pellentesque scelerisque leo turpis, sit amet aliquet arcu volutpat non. Maecenas tempus posuere nisi, nec efficitur justo dictum ut. Maecenas volutpat posuere enim. Sed lacinia tellus ac gravida ultricies. Sed facilisis consequat sem, non ultricies lectus consequat et. Maecenas pretium finibus tortor in ultrices. Nullam velit ipsum, ultrices eu dictum nec, efficitur a eros. Aliquam erat volutpat. Nulla neque est, rhoncus pellentesque suscipit ut, ullamcorper eget justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vel fermentum dui. Ut laoreet commodo velit ut convallis. Donec malesuada enim ut elit pulvinar pharetra. Aenean rutrum, nisi sit amet mollis aliquet, sem tortor sagittis ante, ut commodo tellus purus et elit. Integer augue mi, vehicula nec consequat sed, aliquet eu tellus. Nulla vitae sapien tortor. Aliquam et eleifend nisl, eget maximus nisl. Vestibulum quis iaculis dui, ut finibus leo. Etiam euismod luctus mi, a iaculis ipsum aliquam ac. Cras facilisis, ex ut interdum aliquet, tortor nulla commodo arcu, sed auctor libero risus in ligula. In rutrum erat ac eros dapibus, a pretium eros ultricies. Suspendisse non pretium nisl."
    },
    {
        name: "Campground #3",
        image: "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/Moraine-Park-Campground-Tinkurlab-OutThere-Colorado.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisi sit amet nulla gravida lacinia. Nullam a eros et erat tempus molestie id ut libero. Pellentesque scelerisque leo turpis, sit amet aliquet arcu volutpat non. Maecenas tempus posuere nisi, nec efficitur justo dictum ut. Maecenas volutpat posuere enim. Sed lacinia tellus ac gravida ultricies. Sed facilisis consequat sem, non ultricies lectus consequat et. Maecenas pretium finibus tortor in ultrices. Nullam velit ipsum, ultrices eu dictum nec, efficitur a eros. Aliquam erat volutpat. Nulla neque est, rhoncus pellentesque suscipit ut, ullamcorper eget justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vel fermentum dui. Ut laoreet commodo velit ut convallis. Donec malesuada enim ut elit pulvinar pharetra. Aenean rutrum, nisi sit amet mollis aliquet, sem tortor sagittis ante, ut commodo tellus purus et elit. Integer augue mi, vehicula nec consequat sed, aliquet eu tellus. Nulla vitae sapien tortor. Aliquam et eleifend nisl, eget maximus nisl. Vestibulum quis iaculis dui, ut finibus leo. Etiam euismod luctus mi, a iaculis ipsum aliquam ac. Cras facilisis, ex ut interdum aliquet, tortor nulla commodo arcu, sed auctor libero risus in ligula. In rutrum erat ac eros dapibus, a pretium eros ultricies. Suspendisse non pretium nisl."
    },
]

// function seedDB(){
//     Campground.remove({},(err)=>{
//         if(err){
//             console.log(err);
//         }
//     })
// }

function seedDB() {
    //Remove all Comments
    Comment.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("comments removed");
            //Remove all campgrounds
            Campground.remove({}, (err) => {
                if (err) {
                    console.log("err");
                } else {
                    console.log("campground removed")
                    //Add a few campgroudns
                    data.forEach((campground) => {
                        Campground.create(campground, (err, newCampground) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Added Campground");
                                //create a comment
                                Comment.create({
                                    text: "This place is great, but I wish there was internet",
                                    author: "Homer"
                                }, (err, comment) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        newCampground.comments.push(comment);
                                        newCampground.save();
                                    }
                                })
                            }
                        })
                    })
                }
            });
        }
    })
    //add some comments
}

module.exports = seedDB;
const Home=require('../model/home.js')
const User = require('../model/user.js')
exports.AddaHome = async (req,res,next)=>{
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  res.render('host/edit-home',{editing:false,
    isLoggedIn:req.session.isLoggedIn, 
    user:user
  })
}
exports.HomeAdded= async(req,res,next)=>{
  const {username, price, rating, location}=req.body
  const home = new Home({username, price, rating, location})
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  home.save().then(()=>{
  res.render('host/Homeadded',{
   isLoggedIn:req.session.isLoggedIn,
   user:user
  })
  }).catch(()=>{
    console.log("Error in saving the new")
  })
}
exports.HomePage=async(req,res,next)=>{
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  
  Home.find().then((homes)=>{
    res.render('store/index', {homes: homes,
        isLoggedIn:req.session.isLoggedIn,user
     })
  })
}
exports.HomeList=async(req,res,next)=>{
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  Home.find().then((homes)=>{
    res.render('store/home-list', {homes: homes,
        isLoggedIn:req.session.isLoggedIn,user
     })
  })
}


exports.Bookings=async(req,res,next)=>{
  const userId= req.session.userId
  const user =await  User.findById(req.session.userId);
  Home.find().then((homes)=>{
    res.render('store/bookings', {homes: homes,
        isLoggedIn:req.session.isLoggedIn,
        user
    })
  })
}
exports.HostList=async(req,res,next)=>{
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  Home.find().then((homes)=>{
    res.render('host/host-list', {homes: homes,
        isLoggedIn:req.session.isLoggedIn,
        user
    })
  })
}
exports.Details=async(req,res,next)=>{
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  const homeId=req.params.homeId
  Home.findById(homeId).then((home)=>{
 if (home) {
      res.render('store/details', { home: home ,
          isLoggedIn:req.session.isLoggedIn,
          user
      });
    } else {
      res.redirect('/');
    }
  })  
}
exports.postFavourites = async (req, res, next) => {
  
    const homeId = req.body.homeId;
    const userId = req.session.userId
     User.findById(userId).then((user)=>{
      if(!user.favouriteHomes.includes(homeId)){
        user.favouriteHomes.push(homeId)
        return user.save()
      }
      return user
     })
  .then(()=>{
    res.redirect('/user/home/favHomes')
  })
  .catch((err)=>{
    console.log("error while addiing to favourites",err)
         res.redirect('/user/home/favHomes')
  })

};

exports.getFavourites = async (req, res, next) => {
    const userId = req.session.userId
User.findById(userId).populate('favouriteHomes').then((user)=>{
  res.render('store/favourites',{
    homes:user.favouriteHomes,
    isLoggedIn:req.session.isLoggedIn,
    user
  })
})
};
exports.getEditHome =async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
  Home.findById(homeId).then((home)=>{
    
 if (!home) {
      return res.redirect('/host-list');
    }
  res.render('host/edit-home', { editing: editing, home: home ,
      isLoggedIn:req.session.isLoggedIn,
      user
  });
  }) 
}
exports.postEditHome = async(req, res, next) => {
  const {id,username, price, rating, location } = req.body;    
  const userId= req.session.userId
  const user = await User.findById(req.session.userId);
 Home.findById(id).then((home)=>{
    home.username=username
    home.price=price
    home.rating=rating
    home.location=location
    return home.save()
  }).then(()=>{
    res.redirect('/host-list',{
      user
    })
  }).catch((error)=>{
    console.log("Editing not done in your home",error)
  })
}
exports.deleteHome =async (req, res, next) => {
  const userId= req.session.userId
  const user =  await User.findById(req.session.userId);
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect('/host-list',user);
  });
}

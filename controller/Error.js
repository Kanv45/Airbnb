exports.Error=(req,res,next)=>{
  res.status(404).render('error',{
   isLoggedIn: req.session.isLoggedIn
  })
}
const postsList = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { stringify } = require("querystring");


dotenv.config();


function index(req, res) {
    res.format({
        html: () => {
            const html = [`
                <h1>I Miei Posts</h1>
            `];
            html.push("<ul>");
            for( const post of postsList){
                html.push(`<li>
                    <a href="/posts/${post.slug}">${post.title}</a><br><br>`
                );
                html.push("</li>");
            }
            html.push("<ul>");
            res.send(html.join(""));
        },
        json: () => {
            res.type("json").send({
              totalElements: postsList.length,
              list: postsList
            });
        }
    });
   
}

function show(req, res){
    const post = findOrFail(req, res);
    console.log(post);
    post["image_url"] = "http://localhost:3001/"+ "assets/" + "imgs/" + "posts/" + post.image;
    // post["image_url"] = `${req.protocol}://${req.hostname}:${process.env.PORT}` + "/assets/imgs/posts/" + post.image;
    post["image_download_url"] = "http://localhost:3001/" + "posts/" + post.slug + "/" + "download";
    res.json(post);
}

function create(req, res){
    res.format({
        html: () => {
            const html = [`
                <h1>Creazione nuovo post</h1>
            `];
             res.send(html.join(""));
        },
    })
    // res.status(406).send(`Wrong request`);
}
function store(req, res){
    const newPost = {
        "title": req.body.title,
        "slug": req.body.slug,
        "content": req.body.content,
        "image": req.file,
        "tags": req.body.tags,
    }
    const slugArray = postsList.map((post) => post.slug);
    console.log(slugArray);
    if (!slugArray.includes(newPost.slug)) {
        postsList.push(newPost);
        const filePath = path.resolve(
            __dirname,
            "..",
            "db",
            "db.json"
          );
        fs.writeFileSync(filePath, JSON.stringify(postsList, null, 2));
        res.format({
            
            html: () => {
                res.redirect("/posts/" + newPost.slug);
            },
        
            default: () => { 
                res.json(newPost);
            }
        })  
    }
    else{res.send("The post you are trying to add already exists")}
    
    
}
function destroy(req, res){
    const post = findOrFail(req, res);
    let index = postsList.findIndex(existingPost => existingPost.slug === post.slug);
    postsList.splice(index, 1);
  
    const json = JSON.stringify(postsList, null, 2);
    // = fs.writeFileSync(filePath, JSON.stringify(postsList, null, 2));
    if (post.image) {
        if (typeof post.image === "string") {
            const filePath = path.resolve(
                __dirname,
                "..",
                "public",
                "assets",
                "imgs",
                "posts",
                post.image
                );

                fs.unlinkSync(filePath);
        } else{
            const filePath = path.resolve(__dirname, "..", post.image.path); 
            fs.unlinkSync(filePath);
        }
    };
    fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), json);
    res.format({
        html: () => {
            res.redirect("/posts");
        },
        default: () => {
            res.send("Il post è stato eliminato!")  
        }
    })
}

function download(req, res){
    const post = findOrFail(req, res);

    const filePath = path.resolve(
        __dirname,
        "..",
        "public",
        "assets",
        "imgs",
        "posts",
        post.image
      );

    res.download(filePath);
    // res.status(406).send(`Wrong request`);
}


function findOrFail(req, res) {
    // recupero l'id dalla richiesta
    const postSlug = req.params.slug;
  
    // recupero il post dalla lista dei posts
    const post = postsList.find((post) => post.slug == postSlug);
  
    // Nel caso in cui non sia stato trovato il post ritorno un 404
    if (!post) {
      res.status(404).send(`Il post con slug ${postSlug} non è stato trovato`);
      return; // interrompo l'esecuzione della funzione
    }
  
    return post;
  }

module.exports = {
index,
show,
create,
download,
store,
destroy
}
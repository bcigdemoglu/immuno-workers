function createImage(id, imglink, headtext, foottext) {
    const col = $("<div>", {id: `div-${id}`, "class": "col-sm-4"});
    const panel = $("<div>", {id: `panel-${id}`, "class": "panel panel-success"});
    const heading = $("<div>", {id: `heading-${id}`, "class": "panel-heading", text: headtext});
    const imagediv = $("<div>", {id: `imagediv-${id}`, "class": "panel-body"});
    const image = $("<img>", {id: `image-${id}`, src: imglink, "class": "img-responsive", style:"width:100%", alt:"Image"});
    const footer = $("<div>", {id: `footer-${id}`, "class": "panel-footer", text: foottext});
    col.append(panel);
    panel.append(heading, imagediv, footer);
    imagediv.append(image);
    return col;
}

function getCandidates() {
    $.getJSON( "/recruiter/gallery", function( data ) {
        $(" #gallery ").empty();
        const gallery = $("<div>", {id: "candidate_gallery_row", class: "row"});
        for(const candidate of data.candidates) {
            $(createImage(
            candidate._id,
            "https://pbs.twimg.com/profile_images/901246721807613952/96vurX5G_400x400.jpg",
            candidate.name,
            `Age: ${candidate.age}`)).appendTo(gallery);
        }
        gallery.appendTo( "#gallery" );
    });
}

function getJobs() {
    $.getJSON( "/job/gallery", function( data ) {
        $(" #gallery ").empty();
        const gallery = $("<div>", {id: "job_gallery_row", class: "row"});
        for(const job of data.jobs) {
            $(createImage(
            job._id,
            "https://pics.me.me/cant-get-fired-if-you-dont-have-ajob-make-a-16046374.png",
            job.company,
            `Title: ${job.title}`)).appendTo(gallery);
        }
        gallery.appendTo( "#gallery" );
    });
}
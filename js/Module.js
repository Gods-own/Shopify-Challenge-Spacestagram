const photodb = function(dbname, table) {

    const db = new Dexie(dbname)
    db.version(1).stores(table)

    db.open();

    return db
}

const bulkcreate = function(dbtable, data) {
    dbtable.bulkAdd([data]);
}

const getData = function(dbtable, fn) {
    let index = 0;
    let obj = {};
    dbtable = dbtable.reverse();

    dbtable.count(function(number) {
        if(number) {
            dbtable.each(function(table) {
                obj = Sortobj(table);
                fn(obj, index++);
            })
        }
        else {
            fn(0);
        }
    })
}

const Sortobj = function(sortobj) {
    let obj = {};
    obj = {
        id: sortobj.id,
        url: sortobj.url,
        hdurl: sortobj.hdurl,
        title: sortobj.title,
        explanation: sortobj.explanation,
        date: sortobj.date,
        isliked: sortobj.isliked
    }

    return obj;
}

const checkdb = function(dbtable, showImage, showBody, showDelBtn, fn) {
    dbtable.count(function(number) {
        if(number) {
             showImage.style.display = 'none';
             showBody.style.display = 'block';
             showDelBtn.style.display = 'block';
             fn();
        }
        else {
            showBody.style.display = 'none';
            showImage.style.display = 'block';
            showDelBtn.style.display = 'none';
        }
    })
}

export default photodb;

export {
    bulkcreate
}

export {
    getData
}

export {
    checkdb
}

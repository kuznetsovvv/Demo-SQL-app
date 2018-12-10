//default action is to define a global variable containing our result
var clientList;
var editing = "no"; 
function fetchList(){
    $.ajax({
        url: "./interface.php", 
        data: {fn:"list"},
        type: 'GET',
        success: function(result){                                                                      //I will assume that this works, no error handling has been implemented
            window.clientList = JSON.parse(result);
            showList();
        }
    });
}
function showList(){
    var table = ("<table id='clientTable' class='table table-hover table-bordered'><thead><tr>");      // I will assume result is not empty
    for(var colName in window.clientList[0]){
        table += ("<th>"+colName+"</th>");
    }
    table += ("</tr></thead>");
    for(var row in window.clientList){
        table += makeRow(row);
        
    }
    table += ("</table>");
    jQuery("#outputArea").html(table);
}
function makeRow(row){
    var tablerow = ""
    var rowdata = window.clientList[row];
        tablerow += ("<tr class='clientRow' id='"+row+"' onclick='javascript:selectRow(this);'>");
            for(var data in rowdata){
                tablerow += ("<td>"+rowdata[data]+"</td>");            
            }
    tablerow += ("</tr>");
    return tablerow;
}
function selectRow(rowTag){
    row = jQuery(rowTag).attr('id');
    if(window.editing == "no" || window.editing == row){
        window.editing = row;
        var rowdata = window.clientList[row];
        var table = "";
            for(var data in rowdata){
                if(data == "ID"){
                    table += ('<td><span id="savecancel"><span onclick="javascript:save();" class="green">&#10004;</span>&nbsp;<span onclick="javascript:cancel('+row+');" class="red">&#10006;</span></span>&nbsp;'+rowdata[data]+"</td>");   
                }else{
                    table += ("<td><input type='text' id='"+data+"' id='"+name+"' value='"+rowdata[data]+"'/></td>");
                }
            }
        jQuery(rowTag).html(table);
    }else{
        alert("Please save or cancel edits to the other client first.");
    }
}
function cancel(row){
    jQuery("#"+row).replaceWith(makeRow(row));
    window.editing = "no";
}
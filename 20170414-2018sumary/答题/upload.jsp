<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
<html>  
  <head>  
    <!-- <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>   -->
    <!-- <script type="text/javascript" src="js/jquery.form.js"></script>    -->
    <title>试题上传</title> 
    <script type="text/javascript" src="./assets/js/jquery-1.10.1.min.js"></script> 
    
    <style type="text/css">
      body{
        font-size:32px;
        /*width: 40rem;*/
        border:5px solid #ffb100;
      }
      .form_desc{
        text-align: center;
        color:#40130A;
        padding: 1rem 0;
      }
      .form_desc h3,.form_desc h4{
        color:#40130A;
      }
      .form-table{
        width: 100%;
      }
      .form-table tr{
        /*height: 69px;*/
        text-align: center;
      }
      .form-table .td-input input{
        /*width: 30%;*/
        /*height: 100%;*/
        /*padding: 20px;*/
        width: 27rem;
        height: 7rem;
        font-size: 21px;
        outline: none;
        border: none;
        cursor: pointer;
        background: url('./assets/img/type/BUTTON@2x.png') no-repeat center center;
      }
      .form-table .td-input{
        margin-top: 20px;
      }
      .selectFile {
        text-align: center;
        padding-top: 60px;
        /*font-size: x-large;*/
        color:#40130A;
      }
    </style>  
  </head>  
    
  <body>  
    <div class="form_desc"> 
       <div class="desc_title"> 
          <h3>友学习的题库录入</h3>
       </div>
       <div class="desc_content">  
          <!-- <h4>  注意事项：</h4> -->
       </div>
    </div>
    <div class="form_wrap"> 
          <form method="POST"  enctype="multipart/form-data" id="form1" action="../uploadExcel/upload.do">  
             <table class="form-table">  
               <tr>  
              <!-- <td class="left-td">上传文件: </td>   -->
                    <td class="td-input" style="display:none;"> <input type="file" id="upfile" value="选择文件" name="upfile"></td>  
              </tr> 
              <tr>  
                    <td class="td-input" > <input type="button" id="upfile-button" value="选择文件" name="upfile"></td>  
                    <td class="td-input td-submit"><input type="submit" value="提交" onclick="return checkData()"></td>
              </tr>   
              <tr>  
                    <!-- <td class="td-input td-submit"><input type="submit" value="提交" onclick="return checkData()"></td> -->
              </tr>  
            </table> 
          <div class="selectFile">
             <h3 class="selectFile_desc">上传的文件是：</h3>
             <div class="selectFile_file">  </div>
          </div>   
    </form> 
    </div> 
 
      <script type="text/javascript">  
            //ajax 方式上传文件操作  
             $(document).ready(function(){  
                $('#upfile-button').click(function(){
                  $('#upfile').trigger('click');
                });
                $('#upfile').change(function(){
                  var file = $("#upfile").val().split('\\');
                  var fileName = file[file.length-1];
                  $('.selectFile .selectFile_file').text(fileName);
                  
                })
                $('#btn').click(function(){  
                    if(checkData()){  
                        $('#form1').ajaxSubmit({    
                            url:'uploadExcel/ajaxUpload.do',  
                            dataType: 'text',  
                            success: resutlMsg,  
                            error: errorMsg  
                        });   
                        function resutlMsg(msg){  
                            alert(msg);     
                            $("#upfile").val("");  
                        }  
                        function errorMsg(){   
                            alert("导入excel出错！");      
                        }  
                    }  
                });  
             });  
               
             //JS校验form表单信息  
             function checkData(){  
                var fileDir = $("#upfile").val();  
                var suffix = fileDir.substr(fileDir.lastIndexOf("."));  
                if("" == fileDir){  
                    alert("选择需要导入的Excel文件！");  
                    return false;  
                }  
                if(".xls" != suffix && ".xlsx" != suffix ){  
                    alert("选择Excel格式的文件导入！");  
                    return false;  
                }  
                return true;  
             }  
    </script> 
  </body>  
</html>  
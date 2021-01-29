import React, { useState,useEffect } from "react";
import "./Category.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoriesModal from "./components/AddCategoriesModal";
/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const category = useSelector(state => state.category);
  const [show, setShow] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentcategoryId, setParentcategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([])
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  const dispatch = useDispatch();
 
  useEffect(()=>{
    if(!category.loading){
      setShow(false);
    }
  },[category.loading])
  

  const handleClose = () => {
    const form = new FormData();
    if(categoryName === ""){
      alert("Category Name is required");
      setShow(false);
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentcategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentcategoryId("");
    setCategoryImage("");
    setShow(false);
  };
  
  const handleShow = () => setShow(true);
  
  const handleCategoryInput=(key, value, index, type)=>{
    if(type=="checked"){
      const updatedCheckedArray=checkedArray.map((item,_index)=>index==_index ? {...item, [key]:value} : item)
      setCheckedArray(updatedCheckedArray);
    }else if(type== "expanded"){
      const updatedExpandedArray=expandedArray.map((item,_index)=>index==_index ? {...item, [key]:value} : item)
      setExpandedArray(updatedExpandedArray);
    }
  }


  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push(
        {
            label: category.name,
            value:category._id,
            children:category.children.length > 0 && renderCategories(category.children)
        }
        
      );
    }
    return mycategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId:category.parentId,
        type:category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  
  const updateCategoriesForm = ()=>{

    const form = new FormData();


    expandedArray.forEach((item, index)=>{
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId : "");
      form.append('type',item.type);

    })
    checkedArray.forEach((item, index)=>{
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId : "");
      form.append('type',item.type);
    })
    dispatch(updateCategories(form))
    // .then(result =>{
    //   if(result){
    //     dispatch(getAllCategory())
    //   }
    // })
    setUpdateCategoryModal(false);
  }




  // -----------------------------------------------------------------------------------------------------
  // UPDATE CATEGORY MODAL
  // -----------------------------------------------------------------------------------------------------

  const updateCategory = () =>{
    updateCheckedAndExpanedCategories();
    setUpdateCategoryModal(true);
    
  } 
  const updateCheckedAndExpanedCategories = () =>{
    const categories = createCategoryList(category.categories)
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index)=>{
      const category = categories.find((category, _index)=> categoryId == category.value);
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index)=>{
      const category = categories.find((category, _index)=> categoryId == category.value);
      category && expandedArray.push(category);
    })
    setExpandedArray(expandedArray);
    setCheckedArray(checkedArray);
    // console.log({expanded,checked, categories, checkedArray, expandedArray});
  }
  


  // -----------------------------------------------------------------------------------------------------
  // DELETE CATEGORY MODAL
  // -----------------------------------------------------------------------------------------------------

const deleteCategory=()=>{
  updateCheckedAndExpanedCategories();
  setDeleteCategoryModal(true);
}
const deleteCategories = () =>{
  const checkedIdsArray=checkedArray.map((item, index) => ({_id: item.value}));
  const expandedIdsArray=expandedArray.map((item, index) => ({_id: item.value}));
  const idsArray= expandedIdsArray.concat(checkedIdsArray);
  if(checkedIdsArray.length >0 ){
    dispatch(deleteCategoriesAction(checkedIdsArray))
    .then(result =>{
      if(result){
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
      }
    })
    setDeleteCategoryModal(false);
    // if(expandedIdsArray.length >0){
    //   dispatch(deleteCategoriesAction(expandedIdsArray))
    //   .then(result =>{
    //     if(result){
    //       dispatch(getAllCategory());
    //       setDeleteCategoryModal(false);
    //     }
    //   })
    // }

  }
  
}
const deleteCatgoriesClose =()=>{
  // alert('No')
  setDeleteCategoryModal(false);
}
  const renderDeleteCategoriesModal = () =>{
    console.log('Delete', checkedArray);
    return(
      <Modal 
      show={deleteCategoryModal}
      handleClose={() => setDeleteCategoryModal(false)}
      modalTitle="Cofirm"
      buttons={[
        {
          label: 'No',
          color: 'success',
          onClick: deleteCatgoriesClose
        },
        {
          label: 'Yes',
          color: 'danger',
          onClick: deleteCategories
        }
      ]}
      >
        <h6>Expanded</h6>
        {expandedArray.map((item,index) => <span key={index}>{item.name}</span> )}
        <h6>Checked</h6>
        {checkedArray.map((item,index) => <span key={index}>{item.name}</span> )}
      </Modal>
    )
  }


  // -----------------------------------------------------------------------------------------------------


const categoryList = createCategoryList(category.categories);



  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="category">
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions:</span>
              <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
              <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
              <button onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button>
              </div>
              
            </div>
            
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>
              {renderCategories(category.categories)}
            </ul> */}
            <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked =>setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                    check: <IoIosCheckbox />,
                    uncheck: <IoIosCheckboxOutline />,
                    halfCheck: <IoIosCheckboxOutline /> ,
                    expandClose:<IoIosArrowForward /> ,
                    expandOpen: <IoIosArrowDown />

                }}
            />
            
          </Col>
        </Row>
       
      </Container>
      <AddCategoriesModal
       show={show}
       handleClose={()=> setShow(false)}
       onSubmit={handleClose}
       modalTitle={"Add New Category"}
       size="md"
       categoryName={categoryName}
       setCategoryName={setCategoryName}
       parentcategoryId={parentcategoryId}
       setParentcategoryId= {setParentcategoryId}
       categoryList = {categoryList}
       handleCategoryImage={handleCategoryImage}
      />

      <UpdateCategoriesModal
      show={updateCategoryModal}
      handleClose={()=> setUpdateCategoryModal(false)}
      onSubmit={updateCategoriesForm}
      modalTitle={"Update Category"}
      size="lg"
      expandedArray={expandedArray}
      checkedArray={checkedArray}
      handleCategoryInput={handleCategoryInput}
      categoryList={categoryList}
      />

      { renderDeleteCategoriesModal() }

     

    </Layout>
  );
};

export default Category;

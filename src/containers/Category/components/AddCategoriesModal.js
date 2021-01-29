import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";


const AddCategoriesModal =(props)=>{
    const {
        show,
        handleClose,
        modalTitle,
        size,
        categoryName,
        setCategoryName,
        parentcategoryId,
        setParentcategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    }= props
    return(
      <Modal
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
        modalTitle={modalTitle}
        size={size}
      >
        <Row>
          <Col>
          <Input
          value={categoryName}
          placeholder="Enter Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
          className="form-control-sm"
        />
          </Col>
          <Col>
          <select
          className="form-control form-control-sm"
          value={parentcategoryId}
          onChange={(e) => setParentcategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {categoryList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
          </Col>
        </Row>
        <Row>
          <Col>
          <Input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
          
        />
          </Col>
        </Row>
        
        
        
      </Modal>
    );
  }

  export default AddCategoriesModal;
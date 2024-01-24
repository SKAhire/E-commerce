import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createEvent } from "../../redux/actions/event";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const { shop } = useSelector((state) => state.shop);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

useEffect(() => {
  if(error){
    toast.error(error);
  }
  if(success){
    navigate('/dashboard-events')
    toast.success("Event created successfully!")
    window.location.reload(true);
  }
}, [dispatch, error, success])


// handle start date for event
 const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value)
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    setStartDate(startDate)
    setEndDate(null)
    document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10)
 }

//  handle end date for event
const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value)
    setEndDate(endDate)
}

const today = new Date().toISOString().slice(0, 10)
const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : today;

// handle image array
  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

//   form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    })
    newForm.append("name", name)
    newForm.append("description", description)
    newForm.append("category", category)
    newForm.append("tags", tags)
    newForm.append("originalPrice", originalPrice)
    newForm.append("discountPrice", discountPrice)
    newForm.append("stock", stock)
    newForm.append("shopId", shop._id)
    newForm.append("start_Date", startDate.toISOString())
    newForm.append("finish_Date", endDate.toISOString())
    dispatch(createEvent(newForm))
  };
  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-center text-[30px] font-Poppins">Create Event</h5>

      {/* create Event form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your event product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
          cols={30}
          rows={8}
            name="description"
            className="mt-2 appearance-none block w-full py-2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your event description..."
            onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your event tags..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your event product price..."
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (with Discount)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your product price with discount..."
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter your product stock..."
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter event start date..."
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
          />
        </div>
        <div>
          <label className="pb-2">
            Event End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
            placeholder="Enter event end date..."
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Image<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="upload">
            <AiOutlinePlusCircle
              size={30}
              className="mt-3 cursor-pointer"
              color="#555"
            />
          </label>
          <div className="flex items-center flex-wrap">
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover"
                />
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border hover:text-white font-[600] text-purple-600 rounded-[3px] focus:outline-none focus:ring-purple-600 hover:bg-purple-600 border-purple-600 sm:text-sm cursor-pointer"
            value="Create"
          />
        </div>

      </form>
    </div>
  );
};

export default CreateEvent;

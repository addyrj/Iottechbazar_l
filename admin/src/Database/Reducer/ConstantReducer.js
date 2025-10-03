import { ATTRIBUTE_MODAL_STATE, ATTRIBUTEFAMILY_MODAL_STATE, CATEGORY_MODAL_STATE, CHANGE_API_SETTING_STATE, COLOR_MODAL_STATE, MY_API_ERROR, PRODUCT_MODAL_STATE, SET_LOADER, SUBCATEGORY_MODAL_STATE } from "../Constant/AdminConst";

const initialState = {
    loader: false,
    catLanState: false,
    catSlug: "",
    subCatSlug: "",
    attributeSlug: "",
    attributeFamilySlug: "",
    colorSlug: "",
    proSlug: "",
    subCatLanState: false,
    attrLanState: false,
    attrFamilyLanState: false,
    colorLanState: false,
    proLanState: false,
    settingApiState: 0

}
const ConstantReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }

        case MY_API_ERROR:
            return {
                ...state,
                loader: false
            }

        case CATEGORY_MODAL_STATE:
            const { lanState, slug } = action.payload;
            return {
                ...state,
                catLanState: lanState,
                catSlug: slug
            }

        case SUBCATEGORY_MODAL_STATE:
            const { subLanState, subSlug } = action.payload;
            return {
                ...state,
                subCatLanState: subLanState,
                subCatSlug: subSlug
            }

        case PRODUCT_MODAL_STATE:
            const { proLanState, proSlug } = action.payload;
            return {
                ...state,
                proLanState: proLanState,
                proSlug: proSlug
            }

        case ATTRIBUTE_MODAL_STATE:
            const { attrState, attributeSlug } = action.payload;
            return {
                ...state,
                attrLanState: attrState,
                attributeSlug: attributeSlug
            }

        case ATTRIBUTEFAMILY_MODAL_STATE:
            const { attrFamilyState, attributeFamilySlug } = action.payload;
            return {
                ...state,
                attrFamilyLanState: attrFamilyState,
                attributeFamilySlug: attributeFamilySlug
            }

        case COLOR_MODAL_STATE:
            const { colState, colSlug } = action.payload;
            return {
                ...state,
                colorLanState: colState,
                colorSlug: colSlug
            }

        case CHANGE_API_SETTING_STATE:
            return {
                ...state,
                settingApiState: action.payload
            }
        default:
            return state;
    }
}

export default ConstantReducer
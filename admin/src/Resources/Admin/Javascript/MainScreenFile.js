import $ from "jquery"
import 'summernote/dist/summernote';

export const initSummerNote = () => {
    $('#summernote').summernote({
        airMode: true
    });
}
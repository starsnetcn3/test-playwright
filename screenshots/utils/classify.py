import os


def imagesByType(INPUT_DIR, CUSTOMER_URL, ADMIN_URL, BACKEND_URL):
    allImagesPath = os.listdir(INPUT_DIR)
    imagesPath = list(
        filter(lambda path: 'about:blank' not in path, allImagesPath))

    # Flow Pages
    onlineFlowImages = sorted(
        list(filter(lambda path: 'online-flow|' in path, imagesPath)))
    offlineFlowImages = sorted(
        list(filter(lambda path: 'offline-flow|' in path, imagesPath)))

    imagesPathWithoutflow = sorted(
        list(set(imagesPath) - set(onlineFlowImages) - set(offlineFlowImages)))

    # Static Pages
    customerStaticPageImages = list(
        filter(lambda path: CUSTOMER_URL in path, imagesPathWithoutflow))
    adminStaticPageImages = list(
        filter(lambda path: ADMIN_URL in path, imagesPathWithoutflow))

    # Api Calls
    customerApiImages = list(filter(
        lambda path: f"{BACKEND_URL}|api|customer" in path, imagesPathWithoutflow))
    adminApiImages = list(
        filter(lambda path: f"{BACKEND_URL}|api|admin" in path, imagesPathWithoutflow))

    return {
        "onlineFlowImages": onlineFlowImages,
        "offlineFlowImages": offlineFlowImages,
        "customerStaticPageImages": customerStaticPageImages,
        "adminStaticPageImages": adminStaticPageImages,
        "customerApiImages": customerApiImages,
        "adminApiImage": adminApiImages
    }


def systemClassification(SETTINGS, imagesByType):
    systemSettings = SETTINGS

    onlineFlowImages = imagesByType['onlineFlowImages']
    offlineFlowImages = imagesByType['offlineFlowImages']
    customerStaticPageImages = imagesByType['customerStaticPageImages']
    adminStaticPageImages = imagesByType['adminStaticPageImages']
    customerApiImages = imagesByType['customerApiImages']
    adminApiImages = imagesByType['adminApiImage']

    for key in systemSettings.keys():
        onlineFlow = [url for url in onlineFlowImages if any(
            string in url for string in systemSettings[key]['keywords']['online_flow'])]
        offlineFlow = [url for url in onlineFlowImages if any(
            string in url for string in systemSettings[key]['keywords']['offline_flow'])]
        customerStatiic = [url for url in customerStaticPageImages if any(
            string in url for string in systemSettings[key]['keywords']['customer_static'])]
        adminStatic = [url for url in adminStaticPageImages if any(
            string in url for string in systemSettings[key]['keywords']['admin_static'])]
        customerApi = [url for url in customerApiImages if any(
            string in url for string in systemSettings[key]['keywords']['customer_api'])]
        adminApi = [url for url in adminApiImages if any(
            string in url for string in systemSettings[key]['keywords']['admin_api'])]

        systemSettings[key]['keywords']['online_flow'] = onlineFlow
        systemSettings[key]['keywords']['offline_flow'] = offlineFlow
        systemSettings[key]['keywords']['customer_static'] = customerStatiic
        systemSettings[key]['keywords']['admin_static'] = adminStatic
        systemSettings[key]['keywords']['customer_api'] = customerApi
        systemSettings[key]['keywords']['admin_api'] = adminApi

    return systemSettings

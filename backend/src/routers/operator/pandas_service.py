import json

import pandas as pd
from fastapi import UploadFile, HTTPException, status


def get_list_current_names(list_names: list[str]) -> list[str]:
    result_list = []
    for i in list_names:
        names = i
        if i.find(';') != -1:
            names = names.replace(',', '')
            names = names.replace(';', ',')
        result_list.append(names)
    return result_list


async def service_view_data_from_file(file: UploadFile):
    df = pd.read_excel(file.file.read())
    cols_name = (
        'title',
        'source',
        'authors',
        'publication date',
        'link',
        'document type',
    )
    df_cols = list(df.columns)
    for i in cols_name:
        if i not in df_cols:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Столбик {i} не найден")
    get_authors = df['authors'].to_list()
    df.drop(columns=['authors'], axis=1)
    df['authors'] = get_list_current_names(get_authors)
    df.rename(columns={'publication date': 'publication_date', 'document type': 'document_type'}, inplace=True)
    json_result = json.loads(df.to_json(orient="table", index=False))
    return json.dumps(json_result, indent=4)
